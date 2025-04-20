import { all } from "axios";
import {
  fetchNameById,
  fetchUserRating,
  fetchUserBisIds,
  fetchAllUserBis,
} from "../services/userServices";

export class User {
  constructor(id = -1) {
    this.id = id; // Initially set the id when the User object is created
    this.username = "";
    this.userRating = {};
    this.fullname = "";
    this.bis_ids;
    this.all_bis;
    this.bis_view_id = -1; //for updating forms, it tracks the id of the business currently being viewed
  }

  // Define a method to update the user's id
  setId(account_id) {
    this.id = account_id; // Update the user's id
  }

  async getBisbyViewId() {
    if (this.bis_view_id === -1) {
      throw new Error("User Bis View ID must be updated before getting bis");
    }

    const bisItem =
      this.all_bis?.filter(
        (bisItem) => bisItem.business_id === this.bis_view_id
      ) ?? [];
    return bisItem;
  }

  async changeBisViewId(id) {
    this.bis_view_id = id;
  }

  async getId() {
    return this.id;
  }

  async updateBis(newBis) {
    try {
      console.log("updating bis in user");

      // Remove any existing item with the same business_id
      this.all_bis = this.all_bis.filter(
        (bisItem) => bisItem.business_id !== newBis.business_id
      );

      // Add the new item
      this.all_bis.push(newBis);

      // Optionally, log the updated list
      //console.log("Updated bis:", this.all_bis);
    } catch (error) {
      throw new Error(`Failed to update bis: ${error.message}`);
    }
  }

  //Gets username and sets the name in unison, tryna reduce the amount of calls made to database
  async fetchUsername() {
    if (!this.username) {
      const name = await fetchNameById(this.id);
      this.username = name.username;
      this.fullname = name.fullname;
    }
    return this.username;
  }

  async fetchRatings() {
    if (!this.userRating.stars && !this.userRating.review_count) {
      this.userRating = await fetchUserRating(this.id);
    }
    return this.userRating;
  }

  async getUserBis() {
    if (this.all_bis === undefined) await this.fetchUserData();
    else {
      await fetchAllUserBis(this.bis_ids);
    }
    return this.all_bis;
  }

  //Easily return userdata for profile loading
  async fetchUserData() {
    try {
      if (this.bis_ids === undefined) {
        const bis_ids = await fetchUserBisIds(this.id);
        this.bis_ids = bis_ids;
      }
      if (this.all_bis === undefined) {
        const all_bis = await fetchAllUserBis(this.bis_ids);
        this.all_bis = all_bis;
      }
      const ratings = await this.fetchRatings();
      return {
        username: await this.fetchUsername(),
        fullname: this.fullname,
        stars: ratings.stars,
        review_count: ratings.review_count,
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Could not fetch user data");
    }
  }
}
