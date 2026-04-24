# Full-Stack-Labs

## FS_lab-1.2
- Refactored my lab 1.1 into a Vite project using React and deployment using Varcel.

## fs_lab-5.2

- Within this branch I implemented Organizations in Clerk to handle user roles. Here I wanted to implment an admin role that would prevent all other users from adding to the Organization list. This way only admins can do this and only logged in users can see the add employees form. I could also implement this feature to the add employees form as well to prevent any logged in user from adding to the list.

- I used Clerks project setup to create an organization that will automatically have registered users be just a user and admins have to be selected my the owner of the organization that created it within Clerk. This was an easy add to manipulate the UI for privileges and hide features we don't want everyone to have access to.

- This change cause users to be prevented from doing things we do not want them to have access too as well as provide a message that tells them why they cannot do something.

- This change only really adds roles to privileges to the UI in the front end. But it really doesn't provide the same level of role based access for the backend. It is easy to set up and use but long term it would be better to implement a backend role based access for better security.