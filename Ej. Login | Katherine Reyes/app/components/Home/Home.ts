import data from "./feed/data.js"

import "./feed/components/index.js"
import Story, {STttribute} from "./feed/components/story/story.js";
import Counter from "./feed/components/counter/counter.js";
import Profile, {Attribute} from "./feed/components/profile/profile.js";
import Suggestion, {SGAttribute} from "./feed/components/suggestions/suggestions.js";


class FeedContainer extends HTMLElement{
    counters: Counter[] = [];
    profiles: Profile[] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        const counter = this.ownerDocument.createElement("my-counter") as Counter;
        counter.button.addEventListener("click",()=>{
            console.log("button clicked");
        })
        this.counters.push(counter);

        data.forEach((user)=>{
            const profileCard = this.ownerDocument.createElement("my-profile") as Profile;
            profileCard.setAttribute(Attribute.username, user.username);
            profileCard.setAttribute(Attribute.ubication, user.ubication);
            profileCard.setAttribute(Attribute.profileimg, user.profileimg);
            profileCard.setAttribute(Attribute.postimg, user.postimg);
            profileCard.setAttribute(Attribute.captiontext, user.caption.captiontext);
            profileCard.setAttribute(Attribute.hashtag, user.caption.hashtag);
            profileCard.setAttribute(Attribute.numbercoms, String(user.numbercoms));
            profileCard.setAttribute(Attribute.time, user.time);
            this.profiles.push(profileCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.profiles.forEach((profile)=>{
                this.shadowRoot?.appendChild(profile);
            })
        }
    }
}

class StoryContainer extends HTMLElement{
    stories: Story[] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        data.forEach((user)=>{
            const storyCard = this.ownerDocument.createElement("my-story") as Story;
            storyCard.setAttribute(STttribute.username, user.username);
            storyCard.setAttribute(STttribute.profileimg, user.profileimg);
            this.stories.push(storyCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.stories.forEach((story)=>{
                this.shadowRoot?.appendChild(story);
            })
        }
    }
}

class Suggestions extends HTMLElement{
    suggestions: Suggestion [] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        data.forEach((user)=>{
            const storyCard = this.ownerDocument.createElement("my-suggestions") as Suggestion;
            storyCard.setAttribute(SGAttribute.username, user.username);
            storyCard.setAttribute(SGAttribute.profileimg, user.profileimg);
            this.suggestions.push(storyCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.suggestions.forEach((suggestion)=>{
                this.shadowRoot?.appendChild(suggestion);
            })
        }
    }
}

customElements.define("stories-container",StoryContainer);

customElements.define("feed-container",FeedContainer);

customElements.define("suggestions-container",Suggestions);

export class Home extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <link href="./components/Home/style.css" rel="stylesheet">
        <article>
        <div class="head">
        <img class="logo" src="./components/Home/feed/components/profile/img/logo.png">
        <input type="text" class="search" placeholder="Search">
        <div class="Icons">
            <img class="icons" src="./components/Home/feed/components/profile/img/casa.png">
            <img class="icons" src="./components/Home/feed/components/profile/img/mensajes.png">
            <img class="icons" src="./components/Home/feed/components/profile/img/nuevo.png">
            <img class="icons" src="./components/Home/feed/components/profile/img/brujula.png">
            <img class="icons" src="./components/Home/feed/components/profile/img/heart.png">
            <img class="icons" id="userimg" src="https://images.pexels.com/photos/13625508/pexels-photo-13625508.jpeg?cs=srgb&dl=pexels-alteredsnaps-13625508.jpg&fm=jpg">    
        </div>
    </div>
    <div class="info">
        <div>
            <div class="stories">
                <stories-container></stories-container>
            </div>
            <feed-container></feed-container>
        </div>
        <div class="Suggestionscard">
            <div class="user">
                <img class="profile" src="https://images.pexels.com/photos/13625508/pexels-photo-13625508.jpeg?cs=srgb&dl=pexels-alteredsnaps-13625508.jpg&fm=jpg">
                <div>
                    <p class="name1">kathe.reyes19</p>
                    <p class="name2">Kathe Reyes</p>
                </div>
                <p class="switch">Switch</p>
            </div>
            <div class="Suggestions">
                <p class="suggest">Suggestions for you</p>
                <p class="allinfo">See All</p>
            </div>
            <suggestions-container></suggestions-container>
            <p class="infoapp">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language</p>
            <p class="infoapp">2022 INSTAGRAM CLASS PROJECT</p>
        </div>
        
    </div>
        </article>
        `
    }
}

customElements.define("app-home",Home);
