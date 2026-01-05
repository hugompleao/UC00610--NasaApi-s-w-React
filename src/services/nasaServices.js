// Use a chave de demonstração para testes iniciais
const API_KEY = 'cjmepLP2P2vFKVjVyQYcKAowrxSjKiiNUMN6DGby';

//Tratamento de erros
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || errorData.error_message || 'Erro ao carregar dados.');
    }
    return await response.json();
}

//APOD
export async function fetchAPOD(date = '') {
    // Se uma data for fornecida, adicione-a à URL
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date ? `&date=${date}` : ''}`;

    try {
        const response = await fetch(url);
        return await handleResponse(response)

    } catch (error) {
        console.error("Erro no fetch da APOD:", error.message);
        // Lança o erro novamente para que o componente React possa tratá-lo
        throw error;
    }
}

//Asteroids
export async function fetchAsteroids(startDate, endDate) {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await handleResponse(response);
        return data.near_earth_objects;

    } catch (error) {
        console.error("Erro no fetch dos Asteroides", error.message);
        // Lança o erro novamente para que o componente React possa tratá-lo
        throw error;
    }
}


//Nasa Img. and Video Lib.
export async function fetchNasaLib(query = 'galaxy') {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    try {
        const response = await fetch(url);
        const data = await handleResponse(response);
        return data.collection.items;

    } catch (error) {
        console.error("Erro no fetch das Imagens e Vídeos.", error.message);
        throw error;
    }
}

//EONET
export async function fetchEONET(status = 'open', limit = 5) {
    const url = `https://eonet.gsfc.nasa.gov/api/v3/events?status=${status}&limit=${limit}`;

    try {
        const response = await fetch(url);
        const data = await handleResponse(response);
        return data.events || [];

    } catch (error) {
        console.error("Erro no fetch de EONET", error.message);
        throw error;
    }
}

//EPIC
export const fetchEPIC = async () => {
    try {
        const url = `https://api.nasa.gov/EPIC/api/natural?api_key=${API_KEY}`;

        const response = await fetch(url);

        if (response.status === 503) {
            throw new Error("O servidor da NASA está em manutenção. Tente mais tarde.");
        }

        if (!response.ok) {
            throw new Error("Erro ao obter dados do satélite DSCOVR.");
        }

        // Devolve dados em json
        return await response.json();

    } catch (error) {
        console.error("Erro no fetch do EPIC:", error.message);
        throw error;
    }
};

// MARS ROVER PHOTOS
// Caso a API falhe 
const MOCK_MARS_PHOTOS = [
    {
        id: 102693,
        sol: 1000,
        camera: { id: 20, name: "FHAZ", rover_id: 5, full_name: "Front Hazard Avoidance Camera" },
        img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
        earth_date: "2015-05-30",
        rover: { id: 5, name: "Curiosity", status: "active" }
    },
    {
        id: 102653,
        sol: 1000,
        camera: { id: 22, name: "MAST", rover_id: 5, full_name: "Mast Camera" },
        img_src: "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631300503690E01_DXXX.jpg",
        earth_date: "2015-05-30",
        rover: { id: 5, name: "Curiosity", status: "active" }
    },
    {
        id: 424905,
        sol: 1000,
        camera: { id: 22, name: "MAST", rover_id: 5, full_name: "Mast Camera" },
        img_src: "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631200305217E01_DXXX.jpg",
        earth_date: "2015-05-30",
        rover: { id: 5, name: "Curiosity", status: "active" }
    }
];

export const fetchMarsPhotos = async () => {
    const url = `https://images-api.nasa.gov/search?q=curiosity%20rover&media_type=image&year_start=2015&year_end=2016`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`API Image Lib falhou (${response.status}). Usando dados de demonstração.`);
            return MOCK_MARS_PHOTOS;
        }

        const data = await response.json();
        const items = data.collection.items || [];

        // Mapear o formato da Image Library para o formato que o componente espera
        return items.slice(0, 25).map(item => ({
            id: item.data[0].nasa_id,
            img_src: item.links[0].href,
            camera: { full_name: item.data[0].title },
            earth_date: new Date(item.data[0].date_created).toLocaleDateString(),
            rover: { name: "Curiosity" }
        }));

    } catch (error) {
        console.error("Erro na API, carregando fallback:", error);
        return MOCK_MARS_PHOTOS;
    }
};
