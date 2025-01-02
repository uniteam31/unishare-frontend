# unishare

Dev стенд -> [ссылка](http://176.114.90.241/) (работает в режиме воруй-убивай)

### Сборка Dockerfile  

**ENV**: API_URL, BRANCH  
**COMMANDS**:
1. Сборка образа -> `docker build --no-cache -t def1s/unishare-frontend --build-arg API_URL=... --build-arg BRANCH=... .` (точку не забывать)
2. Push -> `docker push def1s/unishare-frontend` (optional)
3. Run -> `docker run def1s/unishare-frontend`
4. Можно взять образ из DockerHub -> `docker pull def1s/unishare-frontend`