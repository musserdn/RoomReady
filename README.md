# RoomReady
The ultimate App for guests to be in the know about their stay. 

## Description
This hotel app helps guests manage their stay and helps housekeeping staff track room status efficiently. Guests can log in to update their room's housekeeping status with a click and check progress while away. If cleaning is ongoing, they can use the "Plan My Day" page to view the weather and local events.

![loginPage](<Screenshot 2025-02-20 193322.png>)

![homepage](<Screenshot 2025-02-20 193151.png>)

![planMyDay](<Screenshot 2025-02-20 193303.png>)

![houseKeepingPage](<Screenshot 2025-02-20 194234.png>)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)
- [Badges](#Badges)

## Installation
Clone the repository & run npm install followed by npm start to begin the development server. This project utilizes SQL databases for the login information, so running the schema & seeds files are necessary for appropriate functionality. Login information can be found & updated in the seeds.sql file.

## Usage
This application can be used by hotels who want to impact the guest experience both inside and out of the hotel. It is also a quick and easy tool that housekeeping can use to update and view room statuses holistically. 

You can access a deployed version on Render here: [RoomReady](https://roomready.onrender.com/)

## License
This project is licensed under the [MIT]([License](https://opensource.org/licenses/MIT)) license.

## Contributing
This project was created by Dan Musser & Natalie Gindraux.

## Credits
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [bootstrap](https://getbootstrap.com/)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://expressjs.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [jwt-decode](https://jwt.io/)
- [lucide-react](https://lucide.dev/guide/packages/lucide-react)
- [pg](https://www.npmjs.com/package/pg)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react](https://react.dev/)
- [sequelize](https://sequelize.org/)
   - In Dev
      - [eslint](https://eslint.org/)
      - [nodemon](https://nodemon.io/)
      - [vite](https://vite.dev/)
    

## Tests
Download the necessary packages and ensure that the statuses are appropriately updating on the guest & housekeeping pages. The housekeeping page can be accessed through http://localhost:5173/housekeeping. 

## Questions
If you have any questions, find us on GitHub at [musserdn](https://github.com/musserdn) or [ngin2894](https://github.com/ngin2894)

## Badges
![GitHub branch check runs](https://img.shields.io/github/check-runs/musserdn/RoomReady/main)
![GitHub contributors](https://img.shields.io/github/contributors/musserdn/RoomReady)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/musserdn/RoomReady)
![GitHub License](https://img.shields.io/github/license/musserdn/RoomReady)
![GitHub repo size](https://img.shields.io/github/repo-size/musserdn/RoomReady)