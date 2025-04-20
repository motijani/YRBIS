import { Alert } from "react-native";
import AWS from "./aws-config";
import { sha256 } from "js-sha256";
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const convertSha = async (password) => {
  return sha256(password);
};

export const post_business = async (
  accid,
  title,
  description,
  location, //latitude and longtitude
  maxDistance,
  pricing,
  tags,
  datePosted,
  status,
  address, //Literall address ex: 123 Drive Elmont Lane
  updating = false,
  id = -1
) => {
  try {
    const businessid = updating ? id : await getBusinessId();
    const newBusiness = {
      RequestItems: {
        all_business: [
          {
            PutRequest: {
              Item: {
                business_id: businessid,
                acc_id: await accid,
                title: title,
                description: description,
                location: location,
                maxDistance: maxDistance,
                pricing: pricing,
                tags: tags,
                status: status,
                datePosted: datePosted,
                lastUpdated: new Date().toISOString(),
                address: address,
              },
            },
          },
        ],
      },
    };

    await dynamoDB.batchWrite(newBusiness).promise(); //write to db
    await updateBusinessId(); //update business ids
    await updateUserBis(await accid, businessid); //update user bis list
    return businessid;
  } catch (error) {
    console.error("Error adding new business:", error);
    throw new Error(`Error creating new business: ${error.message}`);
  }
};

const updateUserBis = async (acc_id, bis_id) => {
  const acc = await acc_id;
  const params = {
    TableName: "Users",
    Key: {
      acc_id: acc_id,
    },
    UpdateExpression: "ADD business_ids :bis_id",
    ExpressionAttributeValues: {
      ":bis_id": dynamoDB.createSet([bis_id]), // Correctly create set of strings
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await dynamoDB.update(params).promise();
  } catch (err) {
    console.error("Update failed:", err);
  }
};

export const createUser = async (username, email, password, fullName) => {
  // Check if email already exists
  const emailCheckParams = {
    TableName: "email_accid",
    Key: {
      email: email,
    },
  };

  try {
    const emailCheckData = await dynamoDB.get(emailCheckParams).promise();
    if (emailCheckData.Item) {
      return { success: false, message: "Account already exists with email" };
    }

    //Check if username already exists
    const usernameCheckParams = {
      TableName: "all_usernames",
      Key: {
        username: username,
      },
    };

    const usernameCheckData = await dynamoDB.get(emailCheckParams).promise();
    if (usernameCheckData.Item) {
      return { success: false, message: "Username already exists" };
    }
    const password_hash = await convertSha(password);

    const current_id = await getAccId();

    // Create new user
    const newUserParams = {
      RequestItems: {
        Users: [
          {
            PutRequest: {
              Item: {
                acc_id: current_id,
                email: email,
                username: username,
                fullname: fullName,
                password_hash: password_hash, // Assuming the password is already hashed
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                business_ids: dynamoDB.createSet([-1]), // Initialize as an empty set of strings
              },
            },
          },
        ],
        all_usernames: [
          {
            PutRequest: {
              Item: {
                username: username,
              },
            },
          },
        ],
        email_accid: [
          {
            PutRequest: {
              Item: {
                email: email,
                acc_id: current_id,
              },
            },
          },
        ],
        user_ratings: [
          {
            PutRequest: {
              Item: {
                acc_id: current_id,
                stars: 5,
                review_count: 0,
              },
            },
          },
        ],
      },
    };

    await dynamoDB.batchWrite((RequestItems = newUserParams)).promise();
    // Increment account ID
    await updateAccId();
    return {
      success: true,
      message: "User created successfully",
      user_id: current_id,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const validateLogin = async (email, password) => {
  const password_hash = await convertSha(password);
  try {
    const params_getid = {
      TableName: "Users",
      Key: {
        acc_id: await getUserIdfrmEmail(email),
      },
    };
    const data = await dynamoDB.get(params_getid).promise();
    if (password_hash !== data.Item.password_hash) {
      return { success: false, message: "Incorrect Password" };
    }
  } catch (error) {
    return { success: false, message: "No account found with email" };
  }
  return {
    success: true,
    message: "",
    user_id: getUserIdfrmEmail(email),
  };
};

export const getName = async (acc_id) => {
  const find_id = await acc_id;
  try {
    const params_getid = {
      TableName: "Users",
      Key: {
        acc_id: find_id,
      },
    };
    const data = await dynamoDB.get(params_getid).promise();
    return { username: data.Item.username, fullname: data.Item.fullname };
  } catch (error) {
    throw new Error("Account not found");
  }
};

export const getRatingsUser = async (acc_id) => {
  const find_id = await acc_id;
  try {
    const params_getid = {
      TableName: "user_ratings",
      Key: {
        acc_id: find_id,
      },
    };
    const data = await dynamoDB.get(params_getid).promise();
    return { stars: data.Item.stars, review_count: data.Item.review_count };
  } catch (error) {
    throw new Error("Account not found");
  }
};

export const getUserIdfrmEmail = async (email) => {
  try {
    const params_getid = {
      TableName: "email_accid",
      Key: {
        email: email,
      },
    };
    const data = await dynamoDB.get(params_getid).promise();
    const account = data.Item.acc_id;
    return account;
  } catch (error) {}
};

/**
 * getAccId gets the next account user_id to use
 * @returns the accid to assign to new account
 */
export const getAccId = async () => {
  const params = {
    TableName: "acc_id",
    Key: {
      current: "current", // Replace with your actual identifier if needed
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();
    if (!data.Item) {
      throw new Error("Item not found");
    }
    return data.Item.value;
  } catch (error) {
    console.error("Error getting acc_id:", error);
    throw new Error("Error getting acc_id");
  }
};

export const getBusinessId = async () => {
  const params = {
    TableName: "business_id",
    Key: {
      current: "current",
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();
    if (!data.Item) {
      throw new Error("Item not found");
    }
    return data.Item.value;
  } catch (error) {
    console.error("Error getting business_id:", error);
    throw new Error("Error getting business_id");
  }
};

export const getUserBisIds = async (acc_id) => {
  const find_id = await acc_id;
  try {
    const params_getid = {
      TableName: "Users",
      Key: {
        acc_id: find_id,
      },
    };
    const data = await dynamoDB.get(params_getid).promise();
    const business_ids = data.Item.business_ids;
    return business_ids;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUserBis = async (bis_ids) => {
  try {
    const keys = bis_ids.values.map((id) => ({ business_id: id }));
    const params = {
      RequestItems: {
        all_business: {
          Keys: keys,
        },
      },
    };

    const data = await dynamoDB.batchGet(params).promise();
    return data.Responses.all_business;
  } catch (err) {
    console.error("Error retrieving items from DynamoDB:", err);
    throw new Error("Could not retrieve items from DynamoDB");
  }
};

/**
 * Updates the account id in database by 1
 * uses: assign user ids
 * @returns
 */
export const updateAccId = async () => {
  try {
    const currentValue = await getAccId();
    const newValue = currentValue + 1;
    const updateParams = {
      TableName: "acc_id",
      Key: {
        current: "current",
      },
      UpdateExpression: "set #val = :val",
      ExpressionAttributeNames: {
        "#val": "value",
      },
      ExpressionAttributeValues: {
        ":val": newValue,
      },
      ReturnValues: "UPDATED_NEW",
    };
    await dynamoDB.update(updateParams).promise();
  } catch (error) {
    console.error("Error updating acc_id:", error);
    throw new Error("Error updating acc_id");
  }
};

export const updateBusinessId = async () => {
  try {
    const currentValue = await getBusinessId();
    const newValue = currentValue + 1;
    const updateParams = {
      TableName: "business_id",
      Key: {
        current: "current",
      },
      UpdateExpression: "set #val = :val",
      ExpressionAttributeNames: {
        "#val": "value",
      },
      ExpressionAttributeValues: {
        ":val": newValue,
      },
      ReturnValues: "UPDATED_NEW",
    };
    await dynamoDB.update(updateParams).promise();
  } catch (error) {
    console.error("Error updating business_id:", error);
    throw new Error("Error updating business_id");
  }
};
