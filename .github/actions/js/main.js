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