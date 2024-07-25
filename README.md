
# How to Build an Angular Pipeline that Deploys to a S3 Service IN AWS

![screenshot](ng.jpg)

# WorkFlow:

```ruby
name: Deploy this Angular App to an S3
on: push
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - name: Get The Code First
              uses: actions/checkout@v4
           
            - name: Cache Dependencies
              id: cache
              uses: actions/cache@v3
              with:
                path: node_modules
                key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
            
            - name: Install Dependencies
              if: steps.cache.outputs.cache-hit != 'true'
              run: npm ci
    build:
        needs:  test 
        runs-on: ubuntu-latest
        steps:
            - name: Get The Code First
              uses: actions/checkout@v4
           
            - name: Cache Dependencies
              id: cache
              uses: actions/cache@v3
              with:
                path: node_modules
                key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
            
            - name: Install Dependencies
              if: steps.cache.outputs.cache-hit != 'true'
              run: npm ci

            - name: Build Website
              run:  npm run build
            
            - name: Upload artifacts
              uses: actions/upload-artifact@v3
              with:
                name: dist-files
                path: dist/blogsapp/browser
    deploy:
        needs: build
        runs-on: ubuntu-latest
        steps:
            - name: Get The Code
              uses: actions/checkout@v4

            - name: Get Build artifacts
              uses: actions/download-artifact@v3
              with:
                name: dist-files
                path: ./dist/blogsapp/browser

            - name: Output content
              run: ls

            - name: Upload to an S3 Bucket
              id: deploy
              uses: ./.github/actions/js
              env:
                AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}}
                AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}}
              with:
                bucket: ${{secrets.BUCKET_NAME}}
                dist-files: ./dist/blogsapp/browser
                bucket-region: us-east-1

            - name: Done !! Here is the Live link
              run: |
                echo "Live URL: ${{steps.deploy.outputs.website-url  }}"


```


```ruby
name: Deploy this Angular App to an S3
on: push

```
The above gives tha name of the Workflow. Then the trigger which is on push

## Lets now analyze the Jobs
## Test First 
```ruby

 runs-on: ubuntu-latest

```

This Job will be running on Ubuntu- latest: [Link text](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md)


```ruby
  - name: Get The Code First
    uses: actions/checkout@v4

```

We need to first Get The Code

```ruby

 - name: Cache Dependencies
   id: cache
   uses: actions/cache@v3
   with:
        path: node_modules
        key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}

```

We need to cache the node_modules folder  ( this will help optimize other steps). Re-caching  will 
happen everytime package-lock.json changes 

```ruby

 - name: Install Dependencies
   if: steps.cache.outputs.cache-hit != 'true'
   run: npm ci

```

The above step will execute only if the cache is not present otherwise will be skipped. If there is no cache
the ```ruby npm ci  ``` command will run which will install the dependencies

## Build 


```ruby 
needs: test 
```
This command says that before the build job rns the test must be successful


```ruby

 runs-on: ubuntu-latest

 ```
 Here the runner is selected

 ```ruby

 - name: Get The Code First
   uses: actions/checkout@v4
 ```
 The code will be downloaded 

```ruby

- name: Cache Dependencies
  id: cache
  uses: actions/cache@v3
  with:
  path: node_modules
  key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}

  ```

  The node_modules part will be cached

  ``` ruby

   - name: Install Dependencies
     if: steps.cache.outputs.cache-hit != 'true'
     run: npm ci

```
If no cache from previous steps then it will be installed


```ruby

  - name: Build Website
    run:  npm run build
```

Then the project will be build which will generate a HTML,CSS and JS Files

```ruby
  - name: Upload artifacts
    uses: actions/upload-artifact@v3
    with:
       name: dist-files
       path: dist/blogsapp/browser

```

This will upload the generated file from the build step to a  folder names dist-files and the path will be 
from dist/blogsapp/browser

## Deploy 
```ruby

 needs: build
 runs-on: ubuntu-latest
  steps:
     - name: Get The Code
      uses: actions/checkout@v4
```

The above specifies that this runs on ubuntu- latest
then it needs the build step
ad it will download the code

```ruby 

 - name: Get Build artifacts
   uses: actions/download-artifact@v3
    with:
        name: dist-files
        path: ./dist/blogsapp/browser
```


This will download the files that were uploaded 

```ruby
- name: Output content
   run: ls
```
This will list the files


```ruby

    - name: Upload to an S3 Bucket
      id: deploy
      uses: ./.github/actions/js
       env:
         AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}}
         AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}}
         with:
            bucket: ${{secrets.BUCKET_NAME}}
            dist-files: ./dist/blogsapp/browser
            bucket-region: us-east-1
```

the above code executes a custom command thich is saved inside .github> actions> js and a file called action.yml
Which is a javascript  Actions  that uses a file called main.js
You will need credentials from AWS to verify that you have permission 


## Action.yml
```ruby

name: S3 Actions
description: This is Where all the S3 Work will be at
inputs:
  bucket: 
    description: " This will be the Name of the S# Bucket"
    required: true

  bucket-region:
    description: ' The S# region'
    required: false
    default: 'us-east-1'

  dist-files:
    description: " The Files to upload to the S#, Index.html ,compressed JS Files and CSS"
    required: true
  
outputs:
  website-url:
    description: ' The site URL'
runs:
  using: "node16"
  main: 'main.js'

  ```

  This code expects three inputs the Bucket which is required, The Bucket-region which not required but has a default value and the dst-files which include the HTML, JS and CSS code generated by build process

  The file will Output the Website URL link

  and its a Javascript Action type hence uses node16 and the file Main.js'

## Main.js File

```ruby

const core= require("@actions/core")
const exec= require('@actions/exec')
const github= require('@actions/github')

function run(){

    const bucket= core.getInput('bucket', {required:true})
    const bucketRegion= core.getInput('bucket-region', {required:true})
    const distFiles= core.getInput('dist-files', {required:true})

    const s3Uri=`s3://${bucket}`
    exec.exec(` aws s3 sync ${distFiles} ${s3Uri} --region ${bucketRegion}`)
    const websiteURl= `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
    core.setOutput('website-url', websiteURl)
}

run()

```

inside the JS folder install the following Libraries and push with the node Modules folder there 
also check git ignore and remove the step that ignores all dist folders

using 
```ruby
npm i @actions/core @actions/exec @actions/github

```

```ruby 

  const bucket= core.getInput('bucket', {required:true})
  const bucketRegion= core.getInput('bucket-region', {required:true})
  const distFiles= core.getInput('dist-files', {required:true})
```

This will read the inputs given to this custom actions

```ruby
    const s3Uri=`s3://${bucket}`
    exec.exec(` aws s3 sync ${distFiles} ${s3Uri} --region ${bucketRegion}`)
```

This will use the CLI on the runner machine to upload the Website 


```ruby
  const websiteURl= `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
  core.setOutput('website-url', websiteURl)
```

Part will construct a URl and set it as output


```ruby
- name: Done !! Here is the Live link
    run: |
      echo "Live URL: ${{steps.deploy.outputs.website-url  }}"

```
This Last Part will now log the  S3 URl where your site is hosted
