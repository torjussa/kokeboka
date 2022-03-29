# Walkthrough 
### Notater fra kurs 06.09.21 med Abakus

 

Hva trenger man på forhånd? Node (v16), npm/yarn, git




Hva er NEXT.js?
Et react rammeverk som gir deg mange utviklervennlige funksjoner ut av boksen.
 
* Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.
Static Generation (Recommended): The HTML is generated at build time and will be reused on each request.
Server-side Rendering: The HTML is generated on each request. 
 	
### Web app
* Lag en tom mappe med hvilket som helst navn og gå inn i den.
* Initier git med `git init`
 
* Skriv `yarn/npx create next-app`
  * Gi den et navn: eks: web

* Kjør opp appen med yarn dev
  * Slett innholdet i index.js og lag en enkel hei trondheim.
  * React syntax. Kan ligne litt på en python funskjon input og output *
  
* Lim inn ferdig stylesheet i `globals.css` fra bredvid.no/styling


### Push appen med git
* Git add
* Git commit
* Gå til github.com og lag repo
* Git remote add origin <link>
* Git push -u origin master
  * Oppdater github og vis at koden ligger der.

### Sanity 
* Lag en mappe med navn studio
* Installer command-line interface: `npm install -g @sanity/cli`
* lag .gitgnore for node_modules

* I studio mappen: sanity init
  * Logg inn
 

* Start prosjektet med sanity start -> localhost 3333

* Lag et enkelt skjema (recipe)
  * String navn
  * Text description
  * Boolean vegetar?
  * Lag ny fil recipe.js
 ```javascript
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
      title: "Vegatar?",
      description: "Er retten vegetariansk",
      name: "vegetarian",
      type: "boolean", 
      initialValue: false   
    },
    {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        validation: Rule => Rule.required(),
        options: {
          source: 'name',
          maxLength: 200, // will be ignored if slugify is set
          slugify: input => input
                               .toLowerCase()
                               .replace(/\s+/g, '-')
                               .slice(0, 200)
        }
      }
  ]
}
```
  
### Hent data fra sanity
* Add cors. `Sanity cors add http://localhost:3000`. Evt på sanity.io

* Gå til web
* Install sanity client: `yarn add @sanity/client`
  * Verifiser at den finnes i package json

Lag en `client.js` fil og link til ditt sanity prosjekt
 ```javascript
Import sanityClient from'@sanity/client'
Export default sanityClient({
projectId:'your-project-id',
dataset:'production',
useCdn:true// })
```
 
* Lag getInitialProps i home page og hent alle oppskrifter.
  * Hvis man ønsker å utnytte fordelene Next tilbyr med Static Site Generation, sjekk ut [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching)!

 ```javascript
import client from "../client"
import { Recipe } from "../components/Recipe"
const HomePage = (props) => {
  const {recipes} = props
  return (
<div className="home">
		<h1>Kokeboka!</h1>
  		<div className="recipes-list">
    		{recipes.map(recipe =>
        			<Recipe recipe={recipe}/>
      		)}
  		</div>
</div>
  )
}
HomePage.getInitialProps = async () => {
  return {recipes: await client.fetch(`*[_type == 'recipe']`)}
}
export default HomePage
```

*Asynkron funksjon lar oss bruke await for å vente på svar. Funksjonen garanterer en return value med et såkalt promise.*

- Se i konsollen hva vi mottar

 
* Lag en komponent `Recipe.jsx`

 ```javascript
export const Recipe = ({recipe}) =>
<div className="recipe">
    	<h3>{recipe.name}</h3>
    	<p>{recipe.description}</p>
</div>
```
 

### Dynamiske sider i Next m/sanity
* Snakk om konseptet med sider og dynamiske sider i Next
 * Upraktisk å skulle lage en side for hver oppskrift
 
* Lag en slug i Sanity
* Hent riktig oppskrift med GROQ query
 
#### oppskrift/[slug].jsx:
 ```javascript 
const Oppskrift = (props) => {
console.log(props)
const {recipe} = props

return <h1> {recipe.name}</h1>
}
Oppskrift.getInitialProps = async (context) => {
const { slug = ""} = context.query
return {
    	recipe: await client.fetch(`*[_type == 'recipe' && slug.current == $slug][0]`,{slug})
}
}
export default Oppskrift
```

### Deploy Sanity
`Sanity deploy`

  
### Deploy Web app

*Hva er Vercel? Alternativer: github pages, heroku, azure.*

* Installer Vercel cli `Npm i -g vercel`
* Fra web mappen: `Vercel login` deretter deploy med `vercel`

* Legg til cors i sanity til den nye web-app lenken 
 
#### Et par ting som kan gå galt:
- Feil mappe man kjører fra
- Cors settings.
- Riktig deployment settings (NEXT.js i vercel settings)

#### Extra:
- Ingredienser (Arrays i Sanity)
- Bilder

