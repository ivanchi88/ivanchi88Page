call npm run deploy

call git add .
call git commit -m "deploy" 
call git push heroku master 