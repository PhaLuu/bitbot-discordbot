const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getFood(searchText) {
	try {
		const food = await axios.get("https://api.edamam.com/api/recipes/v2", { params: { type: "public", q: searchText, app_id: "e69c3227", app_key: "a59e93b9409600bc19a90852d954cc19" } });
		return food;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("recipe")
		.setDescription("This will get a cake food recipe")
		.addStringOption((option) =>
		option
			.setName("name")
			.setDescription("Insert the name of the recipe you would like")
			.setRequired(true)
	),
	async execute(interaction) {
		console.log(interaction.options.getString("name"));
		const food = await getFood(interaction.options.getString("name"));
		const contentEmbed = new EmbedBuilder();
		contentEmbed.setTitle(food.data.hits[0].recipe.label);
		contentEmbed.setColor(0xFFA500);
		console.log(food.data.hits[0].recipe.image);
		contentEmbed.setURL(food.data.hits[0].recipe.url);
		contentEmbed.setImage(food.data.hits[0].recipe.image);

		await interaction.reply({ embeds: [contentEmbed] });
	},
};
