import faker from 'faker';
import * as authAPI from '../lib/api/auth';
import * as postsAPI from '../lib/api/posts';


const fakeData = async () => {
    function regExp(str) {
        let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        if (reg.test(str)) {
          return str.replace(reg, "");    
        } else {
          return str;
        }
    };
    for (let i = 1; i < 109; i++) {
        // logout
        await authAPI.logout();

        let info = faker.helpers.createCard();
        
        // creating user
        let { username, email } = info;
        let sanitizedUsername = regExp(username);  
        let catchPhrase = info.company.catchPhrase; 
        let payloadUser = { username: email, nickname: sanitizedUsername, password: "135789", sentence: catchPhrase }
        await authAPI.register(payloadUser);
        
        // creating post
        let randomNum = () => (Math.floor(Math.random()*10)+1);
        let title = info.posts[0].sentence;
        let FirstParagraph = () => `<p>${info.posts[0].sentences}</p>`;
        let SecondParagraph = () => `<p>${info.posts[1].sentences}</p>`;
        let ThridParagraph = () => `<p>${info.posts[2].sentences}</p>`;
        let bodyShortList = () => `
            <ul>
                <li><b>${info.posts[0].sentence}<b/></li>
                <li><b>${info.posts[1].sentence}<b/></li>
                <li><b>${info.posts[2].sentence}<b/></li>
            </ul>
        `
        let bodyLongList = () => `
            <ul>
                <li><b>${info.posts[0].sentence}<b/></li>
                <li><b>${info.posts[1].sentence}<b/></li>
                <li><b>${info.posts[2].sentence}<b/></li>
            </ul>
        `
        let createText = () => {
            if (randomNum() > 5) {
                return `
                    ${SecondParagraph()}
                    ${ThridParagraph()}
                    <br>
                    ${bodyShortList()}
                    <br>
                    ${bodyLongList()}
                    <br>
                    ${ThridParagraph()}
                    ${FirstParagraph()}
            `}
            return `
                ${bodyShortList()}
                <br>
                ${SecondParagraph()}
                ${ThridParagraph()}
                <br>
                ${bodyLongList()}
                <br>
                ${ThridParagraph()}
                ${FirstParagraph()}
            `
        }
        let body = `${FirstParagraph()} ${SecondParagraph()} <br> ${createText()}`;

        let payloadPost = { title: title, body: body, tags: ["testing", `${sanitizedUsername}`]}
        await postsAPI.writePost(payloadPost);
        console.log(`${i} number of data being created`);
    }
    console.log('fakeData creation completed');
};

export default fakeData;