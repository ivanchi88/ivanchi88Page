call npm run deploy

call git add .
call git commit -m "deploy" 
call git push heroku master 

call git push origin master 

call git checkout -b deploy
call git push origin deploy
call git checkout master