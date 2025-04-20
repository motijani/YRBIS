import {
  getRatingsUser,
  getName,
  getUserBisIds,
  getAllUserBis,
} from "./dynamo-service";

export const fetchNameById = async (id) => {
  try {
    const name = await getName(id);
    if (name.username && name.fullname) {
      return name;
    } else {
      throw new Error("Username not found");
    }
  } catch (error) {
    f;
    throw error;
  }
};

export const fetchUserRating = async (id) => {
  try {
    const userRating = await getRatingsUser(id);
    if (userRating) {
      return userRating;
    } else {
      throw new Error("Account not found");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserBisIds = async (id) => {
  try {
    const getBisIds = await getUserBisIds(id);
    if (getBisIds) {
      return getBisIds;
    } else {
      throw new Error("Error fetching bis ids");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchAllUserBis = async (bis_ids) => {
  try {
    const userBis = await getAllUserBis(bis_ids);
    if (userBis) {
      return userBis;
    } else {
      throw new Error("Error fetching user active bis");
    }
  } catch (error) {
    throw new Error(error);
  }
};
