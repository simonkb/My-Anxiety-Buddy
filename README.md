## Getting Started for Team Collaborators

This project is a React Native application, already ejected from Expo. It's set up to use npm for dependency management. Below are the instructions to get you up and running, along with our collaboration guidelines:

### Prerequisites

* **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website: [https://nodejs.org/](https://nodejs.org/).

* **Git:**  Make sure Git is installed to clone the repository and manage your work.

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/simonkb/My-Anxiety-Buddy.git
   cd My-Anxiety-Buddy
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   This command will fetch and install all the required project dependencies from the `package.json` file.

3. **Run the Project (iOS):**
   ```bash
   npx pod-install
   npx react-native run-ios
   ```
   
   The first command installs CocoaPods dependencies necessary for running on iOS. The second command builds the project and launches the iOS Simulator.


4. **Run the Project (Android):**
   ```bash
   npx react-native run-android
   ```
   This command builds the project and launches the Android Emulator. Ensure you have an Android Emulator or a physical device connected for this. 

### Collaboration Workflow

To ensure smooth collaboration, please follow these rules:

1. **Branching:** Create a new branch for each task you are working on. Use a descriptive name for your branch (e.g., `feature-new-login-screen` or `bugfix-navigation-issue`).
   ```bash
   git checkout -b <your-branch-name>
   ```

2. **Committing:** When you are done with your task or have reached a good stopping point, commit your changes to your branch. Write clear and concise commit messages that explain your changes.
   ```bash
   git commit -m "Your descriptive commit message"
   ```

3. **Pull Request:** Push your branch to the remote repository and create a pull request (PR). In the PR, describe the changes you have made and why they are necessary.
   ```bash
   git push origin <your-branch-name>
   ```

4. **Review and Merge:** The project admin (or designated reviewer) will review your code and provide feedback. Once the PR is approved, the admin will merge your changes into the main branch.


### Additional Notes

* **Staying Up-to-Date:** Regularly pull from the main branch to keep your local repository updated with the latest changes.

Let's build something amazing together!
