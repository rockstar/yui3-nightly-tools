#!/bin/sh

CWD=`pwd`
TEMPDIR=/tmp/yui3-nightly
YUIGITBRANCH=git@github.com:yui/yui3.git
BUILDGITBRANCH=git@github.com:yui/builder.git
TARGET=/tmp/yui3


mkdir $TEMPDIR
cd $TEMPDIR
git clone $YUIGITBRANCH
git clone $BUILDGITBRANCH
cd yui3/src
ant all
cd ..
cp -r build/ $TARGET/`date "+%Y%m%d"`/

cd $CWD
rm -rf $TEMPDIR
