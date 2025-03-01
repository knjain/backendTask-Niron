require("dotenv").config();

// ############### Folder paths variables ###############

const PROFILE_PHOTOS_PATH = "profile-photos";

// ############### Paginations ###############


// ############### Filters ###############


// ############### Enums###############
const TASK_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
};

const TASK_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const TASK_STATUS_ENUM = Object.values(TASK_STATUS); //["Pending", "Completed"]
const TASK_PRIORITY_ENUM = Object.values(TASK_PRIORITY); //["Low", "Medium", "High"]

// ############### Creds from env file###############

const USER_TOKEN_SECRET = process.env.USER_TOKEN_SECRET;
const USER_TOKEN_SECRET_EXPIRY = process.env.USER_TOKEN_SECRET_EXPIRY;



// ############### Event names ###############
const eventNames = {
  UPDATE_TOTAL_TASKS_OF_A_USER: "update-user-tasks",
};

module.exports = {
  PROFILE_PHOTOS_PATH,
  USER_TOKEN_SECRET,
  USER_TOKEN_SECRET_EXPIRY,
  eventNames,
  TASK_STATUS,
  TASK_STATUS_ENUM,
  TASK_PRIORITY_ENUM,
  TASK_PRIORITY,
};
