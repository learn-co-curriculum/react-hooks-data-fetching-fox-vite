# Data Fetching
## Introduction 
In this lesson, we’re going to go through how to fetch data from an API and render that data to the page in a React application. We are going to fetch the data asynchronously when the page first loads and also discuss how to load data based on an event. We will walk through some best practices in the meantime - including adding a user-friendly loading message and following a git workflow.

## Scenario
We’re working on an application that currently renders our company icon of a fox. Coming up is our company anniversary and we’re planning to celebrate by adding a silly randomly generated fox image in place of our usual logo. When you start up the app, you’ll see we have our current logo set up as the initial state for our image url. Our job is to fetch a random image from the API and replace the logo on page load. We also need to implement a button that allows the user to fetch a new image if they so choose that will again replace the logo.

### Task 1: Define the Problem
* The user should be able to:
    * See a randomly generated fox in place of the logo.
    * Click a button to randomly generate a new fox image.
    * See a loading message while waiting for the API in case of a lag.

### Task 2: Determine the Design
* Determine if we need to expand our component tree.
* Determine where we will implement any new hooks, state, or props.

### Task 3: Develop the Code 
* Follow the process below to implement updating logo on page load:
    * When X event occurs (page load, useEffect)
    * Make Y fetch request (GET fox image)
    * Update Z state (set fox image in state)
* Follow the same process to add the button to change the fox image.
    * When X event occurs (onClick)
    * Make Y fetch request (GET fox image)
    * Update Z state (set fox image in state)
* Extra functionality for best practices:
    * Implement a loading message for the user while waiting for the asynchronous fetch request.

### Task 4: Test and Refine 
* Debugging and testing during coding.

### Task 5: Document and Maintain 
* We’ll use some git best practices as we go to keep our commit history well-documented.

## Instructions
### Step 1: After Forking and Cloning the Lab, Create a New Git Branch
To keep feature development separate from the main branch, you will create a new Git branch.
* Open your terminal and navigate to your project folder.
* Create and switch to a new branch by running the following command:
```bash
git checkout -b feature-random-fox
```
* This creates and switches to a new branch called feature-random-fox.

### Step 2: Fetch a Fox Image on Load Using useEffect
* Import useEffect into FoxImage.js by modifying the import statement.
```javascript
import { useState, useEffect } from 'react';
```
* Use useEffect to trigger a fetch request when the component mounts.
* Inside the FoxImage component, add the useEffect hook.
```javascript
function FoxImage() {
  const [image, setImage] = useState(foxLogo)

  useEffect(() => {
    // fetch here 
  }, []);
  
  return (
    <div>
      <p>Learn more about us!</p>
      <img src={image} alt="fox logo" />
    </div>
  );
}
```
* We’ll pass an empty dependency array to ensure the fetch request is only triggered once, when the component first renders.
* Update the state using setImage() with the received image URL.
```javascript
function FoxImage() {
  const [image, setImage] = useState(foxLogo)

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!r.ok) { throw new Error("Failed to fetch image"); }    
        return response.json();
      })
      .then(data => setImage(data.image))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <div>
      <p>Learn more about us!</p>
      <img src={image} alt="fox logo" />
    </div>
  );
}
```

### Step 3: Commit Your Changes
* Stage and commit your code:
```bash 
git commit -am "Fetch fox image on mount using useEffect"
```

### Step 4: Add a Loading Message (Best Practice)

* Modify the component to show a loading message while waiting for the API response by setting a new state. We’ll start at true for the initial state since our app will be setting off the fetch request on page load.

```javascript
const [loading, setLoading] = useState(true);
Update the JSX to conditionally render content:
return (
  <div>
    <p>Learn more about us!</p>
    {loading ? "" : <p>Loading...</p>}
    <img src={image} alt="A Random Fox" />
  </div>
);
```
* Then we need to set the state appropriately in our useEffect, to set loading to false once we’ve gotten the data from the API.
```javascript
function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!r.ok) { throw new Error("Failed to fetch image"); }    
        return response.json();
      })
      .then(data => {
        setImage(data.image);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? "" : <p>Loading...</p>}
      <img src={image} alt="fox logo" />
    </div>
  );
}
```

* This displays "Loading..." until the fetch request completes.

* Commit your changes:
```bash
git add src/FoxImage.js
git commit -m "Add loading message while fetching data"
```

### Step 5: Add a Button to Fetch a New Image

* Create a function to fetch a new fox image on button click. Don’t forget to set loading to true before the fetch and false once the Promise resolves.

```javascript
function fetchNewImage() {
  setLoading(true)
  fetch(API_URL)
    .then(response => {
      if (!r.ok) { throw new Error("Failed to fetch image"); }    
      return response.json();
    })
    .then(data => {
      setImage(data.image);
      setLoading(false);
    })
    .catch(error => console.log(error));
}
```
* Add a button element to trigger this function:
```javascript
return (
    <div>
      <p>Learn more about us!</p>
      {loading ? "" : <p>Loading...</p>}
      <img src={image} alt="fox logo" />
      <button onClick={fetchNewImage}>Get New Fox</button>
    </div>
  );
```

* This allows the user to click the button and update the image.

* Commit your changes:
```bash 
git commit -am "Add button to fetch a new fox image on click"
```

### Step 6: Refactoring

* Did you notice we have some repeated logic in our component?

```javascript
function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!r.ok) { throw new Error("Failed to fetch image"); }
        return response.json();
      })
      .then(data => {
        setImage(data.image);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  function fetchNewImage() {
    setLoading(true);
    fetch(API_URL)
      .then(response => {
        if (!r.ok) { throw new Error("Failed to fetch image"); }
        return response.json();
      })
      .then(data => {
        setImage(data.image);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? "" : <p>Loading...</p>}
      <img src={image} alt="fox logo" />
      <button onClick={fetchNewImage}>Get New Fox</button>
    </div>
  );
}
```

* The fetchNewImage is a repeat of some logic we have in our useEffect. Let’s refactor to have our useEffect use our fetchNewImage function instead.

```javascript
function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true)

  function fetchNewImage() {
    setLoading(true);
    fetch(API_URL)
      .then(response => {
        if (!r.ok) { throw new Error("Failed to fetch image"); }
        return response.json();
      })
      .then(data => {
        setImage(data.image);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  useEffect(fetchNewImage, []);
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? "" : <p>Loading...</p>}
      <img src={image} alt="fox logo" />
      <button onClick={fetchNewImage}>Get New Fox</button>
    </div>
  );
}
```

* That’s looking a bit cleaner now, let’s go ahead and commit those changes.
```bash
git commit -am "Refactor repeated logic to reusable function"
```

### Step 7: Push to GitHub and Merge Changes into main
* Push the branch to GitHub:
```bash
git push origin feature-random-fox
```

* Create a Pull Request (PR) on GitHub:
    * Navigate to your repository on GitHub.
    * Click on "Compare & pull request."
    * Ensure you are requesting to merge your feature branch into the main branch of your own repo (you should see your GitHub username in both the branch you are merging and the one you are requesting to merge to.)
    * Add a brief description of the feature and submit the PR to yourself.

* Merge the PR:
    * Once reviewed, merge the feature-random-fox branch into main. You can safely delete the feature branch on GitHub when prompted once it is merged into main.


### Step 8: Pull the new merged main branch locally and delete merged feature branch (optional):

```bash
git checkout main
git pull origin main

git branch -d feature-random-fox
```

* If the last command doesn’t delete the branch, it’s likely git is not recognizing the branch as having been merged. Verify you do have the merged code in your main branch, then you can run the same command but with a capital D to ignore the warning and delete the branch anyway.

```bash
git branch -D feature-random-fox
```

## Considerations 
When implementing data fetching in React applications, there are several considerations to keep in mind. Below are common challenges, best practices, and trade-offs that may arise during this lab.

1. Ensuring API Requests Are Only Made When Necessary
Challenge: Fetching data on every render can cause performance issues, duplicate API calls, or even get you stuck in a loop that may get you rate limited or banned from an API.
* Step Affected: useEffect should only run once when the component mounts when fetching data to set initial state.
* Solution: The dependency array ([]) in useEffect ensures that the fetch request is made only once, preventing unnecessary re-fetching.
* Pros & Cons of Alternative Approaches:
    * ✅ Keeping the dependency array empty ([]) when possible ensures that data is fetched only when the component mounts. However, there are times when you may need to include a dependency or two - we’ll discuss this in future modules.
    * ❌ Leaving out the dependency array would cause useEffect to run on every render, leading to excessive API calls.

2. Handling API Latency and User Experience
* Challenge: Fetching data from an API takes time, and users may experience a blank screen if not handled properly.
* Step Affected: Displaying a loading message before the image loads.
* Solution: Using state to conditionally show "Loading..." or a loading icon prevents an empty UI and avoids unnecessary user confusion and impatience.
* Pros & Cons of Alternative Approaches:
    * ✅ Showing a "Loading..." message gives users immediate feedback that data is being retrieved.
    * ❌ Not handling loading state could cause confusion as users might think the app is broken if the image takes too long to load.

3. Git Workflow: Feature Branching vs. Direct Commits to Main
* Challenge: Managing changes effectively, especially when working with collaborators, without disrupting the main codebase.
* Step Affected: Creating a feature-random-fox branch before implementing changes.
* Solution: Working on a feature branch ensures that incomplete or buggy code does not affect the main branch.
* Pros & Cons of Alternative Approaches:
    * ✅ Using a feature branch (feature-random-fox) allows testing and refining code before merging into main. Also enhances collaboration as developers can work in isolation on their own branches. It’s best practice to keep main always production ready and bug free, and only merge new code in once it’s been tested and is complete.
    * ❌ Committing directly to main can lead to unstable or broken code in production. If all developers work directly on the same branch, it’s likely to lead to confusing commit history and conflicting changes.
