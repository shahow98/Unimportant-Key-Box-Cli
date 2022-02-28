# unimporant-key-box-cli

###### A command line application is used to record passwords that are not important.

###### 一个命令行应用用于记录保存不重要的密码。

+ **requires**

  + nodeJS
  + npm

+ **install**

  ```shell
  npm install -g unimportant-key-box-cli
  ```
  
+ **db**

  ```
  default -> [] # this a default index
  index1 -> [key1, key2, key3, ...]
  index2 -> [key4, key5, key6, ...]
  ...
  ```
  
+ **example**

  ```shell
  # add a index
  keybox add index index1 description # index1 -> []
  # add a key
  keybox add key key1 pwd index1 # index1 -> [key1]
  # get a index
  keybox get index index1
  # get a key
  keybox get key key1 index1
  # update index's description
  keybox update desc index1 description2
  # update key's password
  keybox update pwd key1 password2 index1
  # delete a index
  keybox del index index1
  # delete a key
  keybox del key key1 index1
  # show indexes
  keybox list
  ```
  
  

