[
  '{{repeat(5)}}',
  {
    UserName: '{{firstName("male")}}',
    Gender: 'male',
    DateOfBirth: '{{date(new Date(1950,0,1), new Date(1999, 11, 31), "YYYY-MM-dd")}}',
    KnownAs: function(){ return this.UserName; },
    Created: '{{date(new Date(2019, 0, 1), new Date(2020,5,30), "YYYY-MM-dd")}}',
    LastActive: '{{date(new Date(2020, 4, 1), new Date(2020,5,30), "YYYY-MM-dd")}}',
    Introduction: '{{lorem(1, "paragraphs")}}',
    LookingFor: '{{lorem(1, "paragraphs")}}',
    Interests: '{{lorem(1, "sentences")}}',
    City: '{{city()}}',
    Country: '{{country()}}',
    Photos: [
      {
        Url: function(num) {
          return 'https://randomuser.me/api/portraits/men/' + num.integer(1,99) + '.jpg';
        },
        IsMain: true
      }
    ]
  }
]
