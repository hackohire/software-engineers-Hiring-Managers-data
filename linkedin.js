var mongodb = require('mongodb');
var async = require('async');
var colors = require('colors');
var ip = '127.0.0.1';
var url = 'mongodb://' + ip + ':27017/test';
var cheerio = require('cheerio');
var request = require('request');


mongodb.connect(url, function(err, db) {
    if (err) {
        consoloe.log(err);
    } else {


        var headers = {
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/69.0.3497.100 Chrome/69.0.3497.100 Safari/537.36',
            'accept': '*/*',
            'referer': 'https://mail.google.com/mail/u/0/',
            'authority': 'www.linkedin.com',
            'cookie': 'bcookie="v=2&e198e2fe-cfee-49a6-8752-946b350295b4"; bscookie="v=1&2018101312164066a874cf-a98b-468b-8cef-28dc3d4f5878AQEe1kMJfZxXch27RxmIIimJnTjUddqT"; _ga=GA1.2.1905812757.1539433001; _guid=90751299-e4fe-46ec-9f5e-8043ddee10b2; li_oatml=AQEwfoB7Ybbd7wAAAWZtW8dZgyvP4yD8SewvdeHBHMT5dvpPpUW-xbobC6-YzgSB-fH34Zxs34uv6ox74PFVVAQVXx-mcw6O; visit="v=1&M"; JSESSIONID="ajax:6492473357971768542"; 04193e1ab818a43e54e28ab9a7d69f79082bfc691fa46bc22b4283db525b121c=8d4691bdd0403b95cefb18fbee2e538e7dd3e3470f8c7d5bb5428c53f6606d4b; sl="v=1&CCeBQ"; lang="v=2&lang=en-us"; li_at=AQEDAR-MxYwDT8YtAAABZn3jDxkAAAFmoe-TGVEAYiJzuaieXWOlgKB99SqRl3Q-fy2neLHlUhuOJeKV508cwfdDxpL0MTf5MUOObr_2Ufd79PWNgcES3ZzDGQZMLqj3awaCO1VN0aD0vTXfql6SBAil; liap=true; _lipt=CwEAAAFmfeMi7a2U7vjxPcGiqAFZHZa8eqhcLL8uZU7O2pgxjq5vcg6HzdacgJEXvpHZd7XFG8BngVRZ4y4mTToFoVW8zg-PYiTrhNV1IIky5DMYsG0ikkCpGQE08aIhlE8tgVCJ8fgu0W9Yy0x9vAn_tswjBemsqwfoellpH9noLlz-lUNqA7NcvlWByQsF82efv34xP5ic3dLRUl36QgY72V-duS9QpuTfrJRoa6Fjk46m7rML2FvPlq4wv1vw9w4uoETGzBENXwib9LZjycVVmvFmudxPowDyG-g6Y4gKf2wSwNC8GhyUyJJur2mVyLziWaH3ZBP76x_MtA; e33e1c5fabfc87d1b4bb70bbae4892e8726f700f6b2c0f3d3fd750f7767669e7=8d4691bdd0403b95cefb18fbee2e538e7dd3e3470f8c7d5bb5428c53f6606d4b; sdsc=1%3A1SZM1shxDNbLt36wZwCgPgvN58iw%3D; spectroscopyId=64c745a7-0b6f-402b-847a-0ca937c350c9; _gat=1; lidc="b=SB08:g=88:u=386:i=1539751119:t=1539755691:s=AQH2GD84XVTUKPBAN2sRqU00jJzQbVyP"'
        };


        var count = 0;

        var data = db.collection('linkedin');


        function rotate() {

            data.find({
                "linkedin": null
            }).limit(100).toArray(function(err, res) {
                if (err)
                    console.log(err);
                else {
                    if (res.length > 0) {

                        async.forEach(res, function(item, cfb) {

                                var email = item._id;


                                var options = {
                                    url: 'https://www.linkedin.com/sales/gmail/profile/viewByEmail/' + email,
                                    headers: headers
                                };



                                function callback(error, response, body) {

                                    if (!error && response.statusCode == 200) {



                                        if (body.indexOf('li-user-location') > -1) {

                                            var $ = cheerio.load(body);
                                            var all = {},
                                                obj = {},
                                                location = {};

                                            if ($('#li-header a').attr('href')) {
                                                all['lid'] = $('#li-header a').attr('href');
                                            }


                                            if ($('.li-user-location')) {
                                                if ($('.li-user-location').text()) {
                                                    all['location'] = $('.li-user-location').text();
                                                }
                                            }
                                            if ($('.li-user-title')) {
                                                if ($('.li-user-title').text()) {
                                                    all['headline'] = $('.li-user-title').text();
                                                }
                                            }
                                            if ($('.li-user-title')) {
                                                if ($('.li-user-title').text()) {
                                                    if ($('.li-user-title').text().split('at')[0]) {
                                                        if ($('.li-user-title').text().split('at')[0].trim()) {
                                                            all['designation'] = $('.li-user-title').text().split('at')[0].trim();
                                                        }
                                                    }
                                                }
                                            }
                                            if ($('.li-user-title')) {
                                                if ($('.li-user-title').text())
                                                    if ($('.li-user-title').text().split('at')[1]) {
                                                        if ($('.li-user-title').text().split('at')[1].trim()) {
                                                            all['company'] = $('.li-user-title').text().split('at')[1].trim();
                                                        }
                                                    }
                                            }

                                            if ($('#li-profile-name')) {
                                                if ($('#li-profile-name').attr('data-fname')) {
                                                    all['fname'] = $('#li-profile-name').attr('data-fname');
                                                }
                                            }
                                            if ($('#li-profile-name')) {
                                                if ($('#li-profile-name').attr('data-lname')) {
                                                    all['lname'] = $('#li-profile-name').attr('data-lname');
                                                }
                                            }

                                            data.update({
                                                _id: item._id
                                            }, {
                                                $set: {
                                                    linkedin: 1,
                                                    linkedin_status: true,
                                                    linkedin_profile: all
                                                }
                                            }, function(err, res) {
                                                if (err)
                                                    console.error(err);
                                                else {
                                                    console.log(email, '\tlinkedin exists\t'.underline.green);
                                                    console.log(all);
                                                    cfb();
                                                }
                                            });



                                        } else if (body.indexOf('li-user-location') == -1) {

                                            data.update({
                                                _id: item._id
                                            }, {
                                                $set: {
                                                    linkedin: 1,
                                                    linkedin_status: false
                                                }
                                            }, function(err, res) {
                                                if (err)
                                                    console.error(err);
                                                else {
                                                    console.log(email);
                                                    cfb();
                                                }
                                            });

                                        }

                                    } else {

                                        console.log(error);

                                    }
                                }

                                request(options, callback);

                            },
                            function(err, res) {
                                if (err)
                                    console.log(err);
                                else {
                                    count++;
                                    if (count == 20) {
                                        console.log('limit exceeded!!!!');
                                        process.exit(1)
                                    } else {
                                        setTimeout(rotate, 1000);
                                    }

                                }
                            });
                    } else {
                        console.log('db completed');
                    }
                }
            });
        }

        rotate();
    }
});