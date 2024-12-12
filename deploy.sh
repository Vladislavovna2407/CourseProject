echo "Kill all the running PM2 actions"
pm2 kill

echo "Jump to app folder"
cd /home/ec2-user/dev/CourseProject

echo "Revert all local changes"
git restore .

echo "Update app from Git"
git pull

echo "Preparing backend to start"
cd /home/ec2-user/dev/CourseProject/back
echo "Install app dependencies"
#rm -rf node_modules package-lock.json
npm install

echo "Run new PM2 action"
pm2 start --name course-back npm -- start
echo "Backend is ready"

cd /home/ec2-user/dev/CourseProject/front
echo "Preparing frontend to start"
echo "Install app dependencies"
#rm -rf node_modules package-lock.json
npm install

echo "Run new PM2 action"
pm2 start --name course-front npm -- start
echo "Backend is ready"

echo "Deployment is complete"