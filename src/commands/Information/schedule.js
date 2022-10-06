const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const cron = require("node-cron");

// get drink data from server api
async function getDrink() {
  try {
    const drink = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    return drink;
  } catch (error) {
    console.log(error);
  }
}
// create EmbedBuilder for drink recipe
async function getDrinkRecipe() {
  const drink = await getDrink();
  const contentEmbed = new EmbedBuilder();
  contentEmbed.setTitle(drink.data.drinks[0].strDrink);
  contentEmbed.setColor(0xffa500);
  contentEmbed.setURL(drink.data.drinks[0].strDrinkThumb);
  contentEmbed.setImage(drink.data.drinks[0].strDrinkThumb);
  const arr = [];
  // check 15 Ingredients
  for (let i = 1; i < 16; i++) {
    drink.data.drinks[0]["strIngredient" + i] &&
      drink.data.drinks[0]["strMeasure" + i] &&
      arr.push({
        name: drink.data.drinks[0]["strIngredient" + i],
        value: drink.data.drinks[0]["strMeasure" + i],
        inline: true,
      });
  }
  contentEmbed.addFields(arr);
  return contentEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Set schedule to get a drink recipe"),

  async execute(interaction) {
    await interaction.reply(
      "I will send you recipe every 7:00 am, 11:00 am and 17:00 pm"
    );
    //const strTest = "0 */1 * * * *"; // every 1 min
    const str7am = "0 0 7 * * *";   // 7:00 am everyday
    const str11am = "0 0 11 * * *"; // 11:00 am everyday
    const str17am = "0 0 17 * * *"; // 17:00 am everyday
    // 7:00 am everyday
    const task1 = cron.schedule(
      str7am,
      async function() {
        const contentEmbed1 = await getDrinkRecipe();
        interaction.user.send({ embeds: [contentEmbed1] });
        console.log("sent recipe!");
      },
      false
    );
    task1.start();
    // ---------------------------------------
    // 11:00 am everyday
    const task2 = cron.schedule(
      str11am,
      async function() {
        const contentEmbed1 = await getDrinkRecipe();
        interaction.user.send({ embeds: [contentEmbed1] });
        console.log("sent recipe!");
      },
      false
    );
    task2.start();
    // ---------------------------------------
    // 17:00 am everyday
    const task3 = cron.schedule(
      str17am,
      async function() {
        const contentEmbed1 = await getDrinkRecipe();
        interaction.user.send({ embeds: [contentEmbed1] });
        console.log("sent recipe!");
      },
      false
    );
    task3.start();
  },
};
