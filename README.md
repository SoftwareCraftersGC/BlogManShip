Run tests:

vagrant init ubuntu/trusty64
vagrant up
vagrant ssh
cd /vagrant

npm install
sudo mkdir /mongoData
mongod --dbpath /mongoData --port 12345 >/vagrant/mongodb.log &
npm test
