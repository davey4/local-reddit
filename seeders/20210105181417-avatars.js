"use strict";

const avatars = [
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_545452.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_A06A42.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_C18D42.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_FF8717.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_FFB000.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_FFD635.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_DDBD37.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_D4E815.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_94E044.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_46A508.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_46D160.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_0DD3BB.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_25B79F.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_008985.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_7193FF.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_4856A3.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_FF66AC.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_DB0064.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_EA0027.png",
  },
  {
    avatar: "https://www.redditstatic.com/avatars/avatar_default_02_FF585B.png",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("avatars", avatars);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("avatars");
  },
};
