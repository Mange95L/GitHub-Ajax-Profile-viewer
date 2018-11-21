$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
      let username = e.target.value;
      
      // Make request to Github
      $.ajax({
          url:'https://api.github.com/users/'+username,
          data:{
            client_id:'836a957016f11dd4adf9',
            client_secret:'68a04746a5f2295f2e2a0470aabebcc5363e7fd8'
          }
      }).done(function(user){
        $.ajax({
          url:'https://api.github.com/users/'+username+'/repos',
          data:{
            client_id:'836a957016f11dd4adf9',
            client_secret:'68a04746a5f2295f2e2a0470aabebcc5363e7fd8',
            sort: 'created: asc',
            per_page: 10
          }
        }).done(function(repos){
          $.each(repos, function(index, repo){
            $('#repos').append(`
             
            <div class="box" style="border-radius: 0 !important;">
  <article class="media">
    
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${repo.name}</strong> <small>Forks count: ${repo.forks_count}, </small><small>Watchers count: ${repo.watchers_count}, </small><small>Stargazers count: ${repo.stargazers_count}</small>
          <br>
          ${repo.description}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
         
          <a class="level-item" aria-label="like" href="${repo.html_url}">Visit repo 
            <span class="icon is-small">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>   
                  
            `);
          });
        });
        $('#profile').html(`
          
        <progress class="progress is-success" value="${user.public_repos}" max="100"></progress>
        <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Public repos</p>
                    <p class="title">${user.public_repos}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Public gists</p>
                    <p class="title">${user.public_gists}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Followers</p>
                    <p class="title">${user.followers}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Following</p>
                    <p class="title">${user.following}</p>
                  </div>
                </div>
              </nav>

        <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="${user.avatar_url}" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${user.name}</strong> <small>Member since: </small> <small> ${user.created_at}</small>
          <br>
          ${user.bio}
        </p>
        ${user.company}
                 <a href="${user.blog}" target="_blank">${user.blog}</a>
                   ${user.location}
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
         
          <a class="level-item" aria-label="like" href="${user.html_url}">Visit profile
            <span class="icon is-small">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>               
          <h3 class="page-header"> </h3>
          <h4 class="title is-4">Latest Repositories:</h4>
          <div id="repos"></div>
          `);
      });
    });
  });