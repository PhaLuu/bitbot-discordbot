const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getUserMeal(searchQuery) {
  try {
    const result = await axios.get(
      "https://api.edamam.com/api/recipes/v2",
      {
        params: {
          type: "public",
          q: searchQuery,
          random: true,
          app_id: "e69c3227",
          app_key: "a59e93b9409600bc19a90852d954cc19"
        }
      }
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("foodspam")
    .setDescription("Spam a user with a random dinner recipe suggestion 🤣")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Type the username you're recipe spamming...")
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
      .setName("ingredient")
      .setDescription("Choose & type a recipe ingredient...")
      .setRequired(true)
  ),
    
    async execute(interaction) {
      const meal = await getUserMeal(interaction.options.getString("ingredient"));
      const randomRecipe = meal.data.hits[Math.floor(Math.random() * 20)].recipe;

      const contentEmbed = new EmbedBuilder()
        .setColor(0x7F49C1)
        .setAuthor({ name: interaction.options.getString("username") + ", you've been spammed with making..." })
        .setTitle(randomRecipe.label)
        .setURL(randomRecipe.url)
        .setImage(randomRecipe.image)
        .addFields(
          { name: "\u200B", value: "\u200B" },
          { name: "Name", value: randomRecipe.label },
          { name: "Source", value: randomRecipe.source, inline: true },
          { name: "Calories", value: String(Math.round(randomRecipe.calories)), inline: true },
        )
        .setTimestamp();

      await interaction.reply({ embeds: [contentEmbed] });
  },
};