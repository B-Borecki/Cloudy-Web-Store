# Cloudy Web Store

### Online shop where you can buy AWS EC2 instances

There is no need to buy an instance in this store, because it works like creating an instance in AWS.
CWS is only a simulation but if someone will register to it with the correct IAM access keys, the store will work and it will create an instance in proper AWS account

**CWS is my sandbox to play with implementing it to the cloud, using multiple AWS services, creating CI/CD pipelines and it is perfect project for this.**
Code is written in Express.js, so it is running in the node.js environment.

## SETUP
### In the future I will create an Ansible playbook that will take care of various configurations, for now it has to be done manually.
In /src/vars.json there are variables:
- "db_endpoint": database URL or IP
- "db_port": database port 
- "db_user": database user
- "db_passwd": database password
- "db": database
- "imgs_path": path where all the photos are located, for example S3 URL, all images must have only ami id in name
- "bucket": this variable is only needed in current Jenkinsfile that was created for me to deploy artifact but you can use the Jenkinsfile too and change it for yourself

**All these variables except "bucket" must be completed for CWS to work properly.**

**You also need a configured database with two tables, products and users.**

DB structure:
- product
  - ami_id
  - name
  - cost
  - free_tier
  - description
- users
  - login
  - password
  - access_key
  - secret_access_key  


## Usage
```
node server.js
```
