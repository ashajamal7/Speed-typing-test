import React, { useEffect } from 'react';
import './page.css'
import './Header'
import Header from './Header';

const Page = () => {
    useEffect(() => {
        fetch('/api/test')
          .then(res => {
            if (!res.ok) {
              // Handle non-OK HTTP status
              return res.json().then(errData => {
                throw new Error(`Server error (${res.status}): ${errData.error || res.statusText}`);
              }).catch(() => {
                throw new Error(`Server error (${res.status}): ${res.statusText}`);
              });
            }
            return res.json();
          })
          .then(data => console.log('Backend response:', data))
          .catch(err => {
            if (err.name === 'TypeError') {
              // Network error or invalid JSON
              console.error('Network error or invalid JSON:', err.message);
            } else {
              // Other errors (e.g., server errors)
              console.error('Backend error:', err.message);
            }
          });

    const paragraphs =[
        "Spring is my favorite season because of the beautiful changes that happen in nature. As the weather warms up, the flowers bloom in vibrant colors, creating a stunning landscape. The sweet scent of blossoms fills the air, inviting bees and butterflies to join the party. Every morning, I love to walk outside and hear the cheerful chirping of birds returning from their winter homes. The gentle breeze is refreshing, and it feels like a hug from nature. I also enjoy seeing the trees regain their green leaves, which makes everything look alive again. Spring is a time for new beginnings, and I often find myself feeling inspired and full of energy. It’s the perfect season for outdoor activities like picnics and hiking. My friends and I enjoy playing soccer in the park or riding our bikes on sunny afternoons. Each day feels like a new adventure waiting to happen. Overall, spring is a magical time that reminds me of the beauty and joy in the world around us. I cherish every moment of this season and look forward to its return each year.",

        "Setting personal goals is an essential part of growth and development. This year, my primary goal is to improve my reading skills. I have always loved stories, but I often find it challenging to read longer books. To achieve this goal, I created a reading plan that includes a list of books I want to read. I also set aside time each day to practice reading, making it a routine part of my life. So far, I have read three books, each one teaching me valuable lessons and expanding my imagination. I’ve discovered new genres, like fantasy and mystery, which have become favorites of mine. Along the way, I learned the importance of perseverance and patience, as some books require more effort to understand. Reflecting on my progress, I feel proud of the time and dedication I have put into this goal. I also appreciate the support from my family, who encourages me to keep reading. I believe that reaching this goal will not only enhance my reading skills but also inspire me to set and achieve other personal goals in the future.",

        "this is a simple paragraph that is meant to be nice and easy to type which is why there will be commas no periods or any capital letters so i guess this means that it cannot really be considered a paragraph but just a series of run on sentences this should help you get faster at typing as im trying not to use too many difficult words in it although i think that i might start making it hard by including some more difficult letters I'm typing pretty quickly so forgive me for any mistakes i think that i will not just tell you a story about the time i went to the zoo and found a monkey and a fox playing together they were so cute and i think that they were not supposed to be in the same cage but they somehow were and i loved watching them horse around forgive the pun well i hope that it has been highly enjoyable typing this paragraph and i wish you the best of luck getting the best score that you possibly can",
    ];

    const typeText= document.querySelector(".type-text p");
    const inpBox= document.querySelector(".main-box .input-box");
    const tryAgainBtn= document.querySelector(".content button");
    const timeTag= document.querySelector(".time span");
    const mistakesTag= document.querySelector(".mistakes span");
    const wpmTag= document.querySelector(".wpm span");
    const cpmTag= document.querySelector(".cpm span");

    let timer;
    let maxTime=60;
    let timeLeft= maxTime;
    let charIndex = 0;
    let mistakes= 0;
    let isTyping = false;

    function loadParagraph() {
        const randomIndex= Math.floor(Math.random() * paragraphs.length);
        typeText.innerHTML = "";
        paragraphs[randomIndex].split("").forEach(char=>{
            let span = `<span>${char}</span>`;
            typeText.innerHTML += span;
        });
        typeText.querySelectorAll("span")[0].classList.add("active");
        document.addEventListener("keydown", ()=> inpBox.focus());
        typeText.addEventListener("click", ()=> inpBox.focus());
    }

    function initTyping() {
        let characters = typeText.querySelectorAll("span");
        let typedChar = inpBox.value.split("")[charIndex];
        if (charIndex < characters.length - 1 && timeLeft > 0){
            if(!isTyping){
                timer=setInterval(initTimer, 1000);
                isTyping = true;
            }
            if(typedChar == null){
                if(charIndex > 0){
                    charIndex--;
                    if(characters[charIndex].classList.contains("incorrect")){
                        mistakes--;
                    }
                    characters[charIndex].classList.remove("correct", "incorrect");
                }
            }else{
                if(characters[charIndex].innerText == typedChar){
                    characters[charIndex].classList.add("correct");
                }else{
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }
            characters.forEach(span => span.classList.remove("active"));
            characters[charIndex].classList.add("active");

            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

            wpmTag.innerText = wpm;
            mistakesTag.innerText = mistakes;
            cpmTag.innerText = charIndex - mistakes;
        } else{
            clearInterval(timer);
            inpBox.value = "";
        }
    }

    function initTimer() {
        if(timeLeft > 0){
            timeLeft--;
            timeTag.innerText = timeLeft;
            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpmTag.innerText= wpm;
        }else{
            clearInterval(timer);
        }
    }

    function resetGame() {
        loadParagraph();
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = 0;
        mistakes = 0;
        isTyping = false;
        inpBox.value = "";
        timeTag.innerText = timeLeft;
        wpmTag.innerText = 0;
        mistakesTag.innerText = 0;
        cpmTag.innerText = 0;
    }

    loadParagraph();
    inpBox.addEventListener("input", initTyping);
    tryAgainBtn.addEventListener("click", resetGame);
    }, []);


  return (
    <div>
        <Header></Header>
    <div className="page">
        <div className="main-box">
        <input type="text" class="input-box"/>
        <div className="content-box">
            <div className="type-text">
                <p className="paragraph"></p>
            </div>
            <div className="content">
                <ul className="result">
                    <li className="time">
                        <p> Time Left:</p>
                        <span><b>60</b>s</span>
                    </li>

                    <li className="mistakes">
                        <p> Mistakes:</p>
                        <span>0</span>
                    </li>

                    <li className="wpm">
                        <p> WPM:</p>
                        <span>0</span>
                    </li>

                    <li className="cpm">
                        <p>CPM:</p>
                        <span>0</span>
                    </li>        
                </ul>
                <button>Try Again</button>
            </div>
        </div>
    </div>
    </div>
   </div> 
  )
}

export default Page
