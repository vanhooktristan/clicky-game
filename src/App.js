//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import image from "./images.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    image,
    clickedImage: [],
    score: 0
  };

//when you click on a card ... the image is taken out of the array
  imageClick = event => {
    const currentimage = event.target.alt;
    const imageAlreadyClicked =
      this.state.clickedImage.indexOf(currentimage) > -1;

//if you click on a image that has already been selected, the game is reset and cards reordered
    if (imageAlreadyClicked) {
      this.setState({
        image: this.state.image.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedImage: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available image, your score is increased and cards reordered
    } else {
      this.setState(
        {
          image: this.state.image.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedImage: this.state.clickedImage.concat(
            currentimage
          ),
          score: this.state.score + 1
        },
//if you get all 12 image corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              image: this.state.image.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedImage: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.image.map(image => (
            <FriendCard
              imageClick={this.imageClick}
              id={image.id}
              key={image.id}
              image={image.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;