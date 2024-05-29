=>Firebase is a tools for building apps and managing infrastructure on top of google cloud platform it was founded by james tamplin and Andrew lee in 2011
=>After they discovered that developers were using their chat software to manage non-chat application data this inspired them to create a real-time database
=>A json database that automatically stays in sync with your frontend application it was later expanded to support user authentication and website hosting to act as a complete backend as a service in 2014 it was acquired by google it was further expanded with serverless computing via cloud functions and other google services like analytics etc 
=> In 2017 google acquired fabric from twitter and also launched a new document database called firestore to support a wide range of applications 
=>Firebase is a built services instead of developing your own database and server using firebase directly you can focus on developing the frontend stuff

Advanatages:
1.Easy to integrate
2.Secure Authentication
3.Real-time Updates
4.User Management
5.Cross-platform Support:

Disadvantages:
1.Limited Customization
2.Cost
3.Dependency on Third-party Service

Authentication install - npm i firebase
Storage install - npm install firebase @firebase/storage


const storageRef = ref(storage, 'images/' + file.name);: This line creates a reference to a location in Firebase Storage where the file will be uploaded. It uses the ref function provided by Firebase Storage, specifying the storage object (previously initialized with Firebase) and the path where the file will be stored. The path in this example is 'images/' + file.name, where 'images/' is the directory within Firebase Storage where the file will be stored, and file.name is the name of the file being uploaded.

await uploadBytes(storageRef, file);: This line uploads the file to the specified location in Firebase Storage. It uses the uploadBytes function provided by Firebase Storage, passing in the storageRef created in the previous step and the file object representing the file to be uploaded.

console.log('File uploaded successfully!');: If the file is uploaded successfully without any errors, this line logs a success message to the console.


