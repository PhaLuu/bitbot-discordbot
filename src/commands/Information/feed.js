const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getFoodPicture() {
  const result = await axios.get("https://foodish-api.herokuapp.com/api");
  return result;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedme")
    .setDescription("Tease me with a random meal picture"),
  async execute(interaction) {
    const foodPicture = await getFoodPicture();
    const contentEmbed = new EmbedBuilder()
    .setTitle("Random Food Picture 🥪 🤤")
    // console.log(foodPicture);
    .setURL(foodPicture.data.image)
    .setImage(foodPicture.data.image);

    await interaction.reply({ embeds: [contentEmbed]});
  }
};