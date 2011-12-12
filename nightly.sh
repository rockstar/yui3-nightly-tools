#!/bin/sh

CWD=`pwd`
TEMPDIR=$CWD/tmp
TARGET=$CWD/build

YUIGITBRANCH=git://github.com/yui/yui3.git
BUILDGITBRANCH=git://github.com/yui/builder.git

DATE=`date "+%Y%m%d"`


mkdir $TEMPDIR
cd $TEMPDIR
git clone $YUIGITBRANCH
git clone $BUILDGITBRANCH
cd yui3/src
ant all -Dlint.skip=true
cd $CWD
mkdir -p $TARGET/$DATE
cp -r $TEMPDIR/yui3/build/* $TARGET/$DATE
rm -rf $TARGET/www
ln -s $TARGET/$DATE $TARGET/www

cd $CWD
rm -rf $TEMPDIR
