const repositories = document.getElementById('repositories');
const username = 'cldavi';
const api_url = `https://api.github.com/users/${username}/repos`;

async function fetchRepositories() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) throw new Error(`Um erro ocorreu: ${response.status}`);

        const all_repositories = await response.json();
        if (all_repositories.length === 0) {
            repositories.innerHTML = '<li>Nenhum repositório público encontrado.</li>';
            return;
        }

        all_repositories.forEach(element => {
            const listItem = document.createElement('li');

            const repoLink = document.createElement('a');
            repoLink.href = element.html_url;
            repoLink.target = '_blank';
            repoLink.textContent = element.name;

            const description = document.createElement('p');
            description.textContent = element.description ? `: ${element.description}` : '';
            description.style.display = 'inline';

            const language = document.createElement('span');
            language.textContent = element.language ? ` (Linguagem: ${element.language})` : '';
            language.style.fontSize = '0.9rem';
            language.style.color = '#555';

            listItem.appendChild(repoLink);
            listItem.appendChild(description);
            listItem.appendChild(language);
            repositories.appendChild(listItem);
        });
    } catch (error) {
        console.error('Ocorreu um erro ao buscar os repositórios:', error);
        repositories.innerHTML = `<li>Erro ao carregar os repositórios: ${error.message}</li>`;
    }
}

fetchRepositories();