const { SlashCommandBuilder } = require("@discordjs/builders");

async function getFood() {
	try {
		const food = await axios.get('https://api.edamam.com/api/recipes/v2?type=public&q=cake&app_id=e69c3227&app_key=a59e93b9409600bc19a90852d954cc19')
		return food
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("food")
		.setDescription("This will get a random food recipe"),
	async execute(interaction) {
		//console.log(interaction.options.getString('hexvalue'));
		const food = await getFood()
		const contentEmbed = new EmbedBuilder()
		contentEmbed.setTitle('Random 🦊');
		contentEmbed.setColor(0xFFA500);
		console.log(food.data.image);
		contentEmbed.setURL(food.data.hits[0].image)
		contentEmbed.setImage(food.data.image)

		await interaction.reply({ embeds: [contentEmbed] });
	},
};
