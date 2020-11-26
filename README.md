# Passive Income Application
![GitHub license](https://img.shields.io/badge/Made%20by-%40Eng.JordanNaei-orange)
![License](https://img.shields.io/badge/License-ISC-blue.svg "License Badge")

# Description
   <p>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; The <em>Passive Income</em> application is a platform which seeks to allow its users to operate from a certain vantage point in regards to price differences that are captured as the net pay-off from a given trade or transcation, in this case, any such transaction regarding iPhones. The application, as it stands, considers the modicum of iPhones that are sold through the retailers of the mutinational technology company of Amazon and the multinational e-commerce coroporation of eBay.   Theoretically, the concept of the <em>Passive Income</em> application can be expanded to include as many such retailers as desirable, and in effect, the theory of <i>arbitrage</i>, off of which the entirety of the conceptual underpinnings of the application are based, support no other endeavor than that: the eventual inclusion of every such retailer under the scope of the arbitrage mechanism implemented by the given application so as to maximize the profit margins of the application users. 
    </p>
    <br>
    <p>
   &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; Arbitrage opportunities are ones off of which an investor, in this cause our application users, can make a risk-less profit via the exploitation of price differences caught in different markets for identical goods. Widgets that, for instance, go for $1 in "abcville" and go, instead, for $2 in "xyzville", can be bought in copious quantities in abcville and immedtiately sold in xyzville for a secure, immediate, and healthy profit. If not for capitalistic ventures, profit is still considerably made in the form of savings that the user reclaims in the mere act of buying something for as cheap as possible, insofar as all the considered retailers are included under the scope of the given artbirage application. In the world markets of today, these opportunities vanish quickly and computers, as well as applications such as our own <em>Passive Income</em>, recognize these price differences and thus execute arbitrage strategies with a rapidity only possible through feats of computation. It is one such simple aribitrage mechanism that is employed through the <em>Passive Income</em> application which, as beneficial as it already is to any user, can only, and endlessley, be made more useful through a simple concatenation of its pre-programmed and extant core elements alone, without the necessitation for the inclusion of any extraenous conceptual framework. 
    </p>

# Application Image
![Application main screen](https://github.com/JordanNaei/passiveIncome/blob/master/public/img/app1.PNG?raw=true)
<hr>

![Application Result Page](https://github.com/JordanNaei/passiveIncome/blob/master/public/img/app2.PNG?raw=true)

<hr>

![Application error screen](https://github.com/JordanNaei/passiveIncome/blob/master/public/img/app3.PNG?raw=true)

<hr>

- [Application URL](https://still-island-50748.herokuapp.com/)

## Technologies and Frameworks Used
- Node.js.
- Express.
- Handlebars.
- My SQL.

# Installation
- Run npm i.
- Run node server.js.

# Database Design
The database design for the passiveincome app involved the creating of a database titled passive_income_db. The passive income database utilized the auto increment MySQL attribute for the creating of a table to store the “ID” parameters by which the various iPhones would be identified and retrieved. This attribute was used because mySQL was needed to assign a sequence of numbers automatically to the given field. This initial column was also defined as “NOT NULL” to enforce a value to always be present in the given field so that a new record could not be added to the field without a value being attributed to it first through this field. 
With the aforementioned terms having been defined, the structure of the database can consequently be discussed. Overall, the database design was carried out in the following steps which provide a general overview of each step taken:
> 1)	The usage of the “CREATE DATABASE” statement to create a database with the name of “passive_income_db.
> 2)	The usage of the “USE passive_income_db;” statement to tell MySQL to use the passive_income_db as the current database for subsequent statements. 
>>- In other words, the “USE” statement is used to select a database and perform SQL operations into that database. 

<hr>
<hr>
<hr>

<p align="center">
  <img src="https://github.com/razaqabdul8/testdeletelater/blob/main/database%20pic.JPG?raw=true"/>
  <br>
  <em>SQL Schema showing the logical collection of database objects described</em>
</p>

3)	The above series of statements are for the creation of a table called “iPhones” thatcontains five columns: id, model, asin_n, upc_n and capacity. 
> 1)	The id column is of type int, auto increment, and not null and will hold an integer. 
> 2)	The model column is of type varchar, not null and will hold characters and the maximum length for this field is 256 characters. 

# Application Requirements

* Must use a Node and Express server (pass)
* Must use Handlebars.js as the template engine (pass)
* Must be backed by a MySQL database with a Sequelize ORM (pass)
* Must utilize both GET and POST routes for retrieving and adding new data (pass)
* Must be deployed using Heroku (with data) (pass)
* Must utilize at least one new library, package, or technology that we haven’t discussed (pass)
* Must have a polished front end/UI (pass)
* Must have a folder structure that meets the MVC paradigm (pass)
* Must meet good quality coding standards (indentation, scoping, naming) (pass)
* Must protect API keys in Node with environment variables (pass)

# Commit Notice
Our Team had issues with commiting code, and due to time constraint we took rather unorthodox way to commit.

# Repository

- [Project Repo](https://github.com/JordanNaei/passiveIncome)

