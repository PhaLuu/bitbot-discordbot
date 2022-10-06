const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getFood(searchText) {
	try {
		const food = await axios.get("https://api.edamam.com/api/recipes/v2", { 
			params: { 
				type: "public", 
				q: searchText, 
				app_id: "e69c3227", 
				app_key: "a59e93b9409600bc19a90852d954cc19" } });
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
				.addChoices({ name: "Cake", value: "cake" }, { name: "Bread", value: "bread" }, { name: "Cookie", value: "cookie" }, { name: "Pastry", value: "pastry" }, { name: "Candy", value: "candy" })
				.setDescription("Insert the name of the recipe you would like")
				.setRequired(true)
		),
	async execute(interaction) {
		console.log(interaction.options.getString("name"));
		const food = await getFood(interaction.options.getString("name"));
		const contentEmbeds = food.data.hits.slice(0, 10).map(hit => {
			const contentEmbed = new EmbedBuilder();
			contentEmbed.setTitle(hit.recipe.label);
			contentEmbed.setColor(0xFFA500);

			contentEmbed.setURL(hit.recipe.url);
			// contentEmbed.setImage(hit.recipe.images.THUMBNAIL.url);
			return contentEmbed;
		});

		await interaction.reply({ embeds: contentEmbeds });
	},
};
