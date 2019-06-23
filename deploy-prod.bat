call npm run deploy

call git add .
call git commit -m "deploy" 
call git push heroku master 

call git push origin master  
call git merge master deploy

call git push origin deploy 