echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ec2-user/dev/CourseProject

echo "Update app from Git"
git pull

echo "Preparing backend to start"
cd back
echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Run new PM2 action"
sudo pm2 start --name course-back npm -- start
echo "Backend is ready"

cd ../front
echo "Preparing frontend to start"
cd back
echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Run new PM2 action"
sudo pm2 start --name course-front npm -- start
echo "Backend is ready"

echo "Deployment is complete"