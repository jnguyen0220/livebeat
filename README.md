<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
<!--   <a href="https://github.com/jnguyen0220/livebeat">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Livebeat</h3>

  <p align="center">
    Livebeat a heartbeat application for the web.
    <br />
    <a href="http://71.147.4.114/">View Demo</a>
    ·
    <a href="https://github.com/jnguyen0220/livebeat/issues">Report Bug</a>
    ·
    <a href="https://github.com/jnguyen0220/livebeat/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Livebeat is real time dashboard application for monitoring heartbeat for any endpoint that can be reach. Livebeat can handle tcp, http and https and allow user to schedule it on an interval. Any status changes to the application will be communicate to all connected clients. Try disabled a task, add/remove and all the clients will see the updates.

### Built With
<!-- 
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples. -->
* [Vue](https://vuejs.org/)
* [Socket.io](https://socket.io/)
* [AG Grid](https://www.ag-grid.com/)
* [Node JS](https://nodejs.org/en/)



<!-- GETTING STARTED -->
## Getting Started

<!-- ### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g -->
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jnguyen0220/livebeat.git
   ```
2. Install using Docker
   ```sh
   docker build -t livebeat-image .
   ```
3. Running
   ```sh
   docker run -d -it -p 5000:5000 --name livebeat livebeat-image
   ```

<!-- ROADMAP -->
## Roadmap
* Import/Export task using json.
* cron expression for schedules.
* Stress test

See the [open issues](https://github.com/jnguyen0220/livebeat/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Jonny Nguyen - jonny_nguyen@outlook.com

Project Link: [https://github.com/jnguyen0220/livebeat.git](https://github.com/jnguyen0220/livebeat.git)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Vuetify Material Design Framework](https://vuetifyjs.com/en/)
* [Bree JS](https://github.com/breejs/bree)
* [lowdb](https://github.com/typicode/lowdb)
* [Express JS](https://expressjs.com/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/jnguyen0220/livebeat
[issues-url]: https://github.com/jnguyen0220/livebeat/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jonny-nguyen-b0b79712/
[product-screenshot]: images/screenshot.png
