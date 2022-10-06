const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

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
    .setName("drinkalarm1")
    .setDescription("Set alarm `minutes / hours` to get a drink recipe")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription(
          "How minutes / hours will you set your alarm. Example: 5s, 10m, 2h"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const time = interaction.options.getString("time");
    await interaction.reply(
      `I will send the drink recipe to your inbox in the next ${time}`
    );

    setTimeout(async () => {
      const contentEmbed1 = await getDrinkRecipe();
      interaction.user.send({ embeds: [contentEmbed1] });
    }, ms(time));
  },
};
