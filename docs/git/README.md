# git 常用操作与指令

Git 本地代码第一次提交到远程的操作
1. 本地 初始化 	
git init 
2. 暂存
git add .
3. 提交 
git commit -m ''
4. 添加到远程
git remote add origin 远程仓库地址
5. 代码提交远程
git push -u origin master

6. 远程获取代码后(会新建develop分支)： git flow init 

7. 新建分支： git flow feature start issue#1
8. git  add . 所有的 也可以单个添加
9. git commit -m 'commit'
10. git flow feature finish issue#1
11. git pull 拉取代码合并 然后在提交到远程   
git pull <远程主机名> <远程分支名>  取回远程主机某个分支的更新，再与本地的指定分支合并 例如：项目所在的远程主机是origin  远程主分支名为master 我们就可以写成 git pull origin master 

git pull是git fetch后跟git merge FETCH_HEAD的缩写    
git fetch：相当于是从远程获取最新版本到本地，不会自动合并

$ git fetch origin master:tmp   
	     $ git diff tmp    
             $ git merge tmp   
查看文件修改：
 git  diff  查看未暂存的文件   
git diff --cached 或者 git diff --staged   查看暂存的文件   

删除本地分支：   
* 隶属分支： git  branch -d dev1  
* 不隶属分支: git branch -D dev2  


删除远程分支：    
    git branch origin --delete dev3  或者 git push origin :分支名

提交到远程：    
git push origin develop

分支上获取最新代码： git rebase develop  (相当于把develop分支上的提交合并到当前分支）   
 因为顺序是重新整理的，所以肯定会出现冲突       
解决冲突，最后 git add * ，但不许要git commit   
解决后，执行 git rebase --continue   
重新提交代码： git push for-*

master分支代码合并：  
 git merge develop

$ git merge --squash another   
$ git commit -m "message here"   
--squash 选项的含义是：本地文件内容与不使用该选项的合并结果相同，但是不提交、不移动HEAD，因此需要一条额外的commit命令。其效果相当于将another分支上的多个commit合并成一个，放在当前分支上，原来的commit历史则没有拿过来。

删除文件git 仓库：    
git rm -rf .git

git stash （储藏）用法：   
经常有这样的事情发生，当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作。问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。解决这个问题的办法就是git stash命令。

“‘储藏”“可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。

查看所有的存储   
git stash list   
应用存储   
git stash apply   
如果你想应用更早的储藏，你可以通过名字指定它，像这样：git stash apply stash@{2}。如果你不指明，Git 默认使用最近的储藏并尝试应用它
你也可以运行 git stash pop 来重新应用储藏，同时立刻将其从堆栈中移走


参考网站： https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001376026233004c47f22a16d1f4fa289ce45f14bbc8f11000


查看提交的日志   
git log（查询所有的）   
git log -p  显示每次提交的内容差异   
git log -p -2  显示两次的提交   
     git log --stat 查看简略的信息   
--pretty  使用不同于默认格式的方式展开提交历史 有4个值 online short full fuller   
git log --pretty=online  每个提交放在一行显示

撤销操作   
有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 --amend 选项的提交命令尝试重新提交：   
git comimit --amend   
；如   
 git commit -m 'initial commit'   
    git add forgotten_file   
     git commit --amend   
第二次的提交 将替代第一次的提交  

打标签   
git tag -a v1.4 -m 'my version 1.4' 附注标签   
git tag v1.4 轻量标签    
git show tagname  查看标签    
git tag -a v1.4 9fecb002(提交的commit id) 如果在提交的时候 忘记打标签   
git push origin v1.4 共享标签 把标签 推送到远程    
git push origin --tags 把所有没有在远程的 推送到远程
