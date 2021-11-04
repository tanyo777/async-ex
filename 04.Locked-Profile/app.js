async function lockedProfile() {
    const url = "http://localhost:3030/jsonstore/advanced/profiles";
    const users = await fetch(url);
    const usersJson = await users.json();
    const keys = Object.keys(usersJson);
    const main = document.getElementById('main');

    for(let key of keys) {
        const user = usersJson[key]; 
        let locked = true;
        // div (profile)
        const container = document.createElement('div');
        container.classList.add('profile');

        // image
        const image = document.createElement('img');
        image.classList.add('userIcon');
        image.src = './iconProfile2.png';

        // Lock Label 
        const lockLabel = document.createElement('label');
        lockLabel.textContent = "Lock";

        // lock radio button
        const lockButton = document.createElement('input');
        lockButton.type = 'radio';
        lockButton.name = `${user._id}`;
        //lockButton.name = `'user1Locked'`;
        lockButton.value = 'lock';
        lockButton.checked = true;

        lockButton.addEventListener('change', () => {
            locked = true;
        })

        // unlock Label 
        const unlockLabel = document.createElement('label');
        unlockLabel.textContent = "Unlock";

        // unlock radio button
        const unlockButton = document.createElement('input');
        unlockButton.type = 'radio';
        //unlockButton.name = 'user1Locked';
        unlockButton.name = `${user._id}`;
        unlockButton.value = 'unlock';

        unlockButton.addEventListener('change', () => {
            locked = false;
        })

        // line breaks 
        const br = document.createElement('br');
        const hr1 = document.createElement('hr');

        // username label
        const username = document.createElement('label');
        username.textContent = "Username";

        // username input
        // username input
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.name = 'user1Username';
        usernameInput.value = `${user.username}`;
        usernameInput.disabled = true;
        usernameInput.readOnly = true;



        // hidden info
        const hiddenInfo = document.createElement('div');
        hiddenInfo.classList.add('user1HiddenFields');
        hiddenInfo.style = "display: none";

        const hr2 = document.createElement("hr");

        // email label
        const emailLabel = document.createElement("label");
        emailLabel.textContent = "Email:";


        // email input
        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.name = "user1Email";
        emailInput.value = `${user.email}`;
        emailInput.disabled = true;
        emailInput.readOnly = true;


        // age label
        const ageLabel = document.createElement("label");
        ageLabel.textContent = "Age:";


        // age input
        const ageInput = document.createElement("input");
        ageInput.type = "number";
        ageInput.name = "user1Age";
        ageInput.value = `${user.age}`;
        ageInput.disabled = true;
        ageInput.readOnly = true;
        
        

        hiddenInfo.appendChild(hr2);
        hiddenInfo.appendChild(emailLabel);
        hiddenInfo.appendChild(emailInput);
        hiddenInfo.appendChild(ageLabel);
        hiddenInfo.appendChild(ageInput)


        const button = document.createElement('button');
        button.textContent = "Show more";
        button.addEventListener('click', () => {
            if(!locked && button.textContent === 'Show more') {
                hiddenInfo.style = "display: block";
                button.textContent = "Hide it"
            } else if(!locked && button.textContent === 'Hide it'){
                hiddenInfo.style = "display: none";
                button.textContent = "Show more";
            }
        })


        container.appendChild(image);
        container.appendChild(lockLabel);
        container.appendChild(lockButton);
        container.appendChild(unlockLabel);
        container.appendChild(unlockButton);
        container.appendChild(br);
        container.appendChild(hr1);
        container.appendChild(username);
        container.appendChild(usernameInput);
        container.appendChild(hiddenInfo);
        container.appendChild(button)
        main.appendChild(container);
        
    };



    
}