call npm run buildProdAngular 
call npm run prod 

call git add .
call git commit -m "deploy" 
call git push heroku master 