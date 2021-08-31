export default 
{
  title: "Oppskrift",
  name: "recipe",
  type: "document",
  fields: [
    {
      title: "Navn",
      description: "Navnet på oppskriften",
      name: "name",
      type: "string",
    },
    {
      title: "Beskrivelse",
      description: "Kort om Oppskriften",
      name: "description",
      type: "text",
    },
    {
      title: "Vegatar?",
      description: "Er retten vegetariansk",
      name: "vegetarian",
      type: "boolean", 
      initialValue: false   
    }
  ]
}