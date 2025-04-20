export const getAllUserBis = async (bis_ids) => {
  const keys = bis_ids.map((id) => ({
    bis_id: id,
  }));

  const params = {
    RequestItems: {
      all_business: {
        Keys: keys,
      },
    },
  };

  try {
    const data = await docClient.batchGet(params).promise();
    return data.Responses.all_business;
  } catch (err) {
    console.error("Error retrieving items from DynamoDB:", err);
    throw new Error("Could not retrieve items from DynamoDB");
  }
};
