import logging
import random

from cars.models import Carros
from django.core.management.base import BaseCommand

logger = logging.getLogger(__name__)

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = "refresh"

""" Clear all data and do not create any object """
MODE_CLEAR = "clear"


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        run_seed(self, options["mode"])
        self.stdout.write("done.")


def clear_data():
    """Deletes all the table data"""
    logger.info("Delete Address instances")
    Carros.objects.all().delete()


def create_address():
    """Creates an address object combining different elements from the list"""
    logger.info("Criando Carros")
    names = [
        "Celta",
        "Gol",
        "Palio",
        "Uno",
        "Fiesta",
        "Corsa",
        "Civic",
        "Corolla",
        "Fusca",
        "Brasilia",
        "Opala",
        "Monza",
        "Kombi",
        "Fusca",
        "Palio",
        "Uno",
        "Fiesta",
        "Corsa",
        "Civic",
        "Corolla",
        "Fusca",
        "Brasilia",
        "Opala",
        "Monza",
        "Kombi",
        "Fusca",
    ]
    brands = [
        "Ford",
        "Chevrolet",
        "Volkswagen",
        "Fiat",
        "Honda",
        "Toyota",
        "Volvo",
        "Mercedes",
        "BMW",
        "Audi",
        "Peugeot",
        "Citroen",
        "Renault",
        "Nissan",
        "Hyundai",
        "Kia",
        "Mitsubishi",
        "Chery",
        "JAC",
        "Jeep",
        "Land Rover",
        "Mini",
        "Porsche",
        "Subaru",
        "Suzuki",
        "Troller",
        "Volvo",
        "Wolksvagem",
    ]
    colors = [
        "Branco",
        "Preto",
        "Vermelho",
        "Azul",
        "Amarelo",
        "Verde",
        "Cinza",
        "Rosa",
        "Laranja",
        "Marrom",
        "Prata",
        "Dourado",
        "Roxo",
        "Bege",
        "Caramelo",
        "Cinza",
        "Lilás",
        "Rosa",
        "Turquesa",
        "Vermelho",
        "Vinho",
        "Branco",
        "Preto",
        "Vermelho",
        "Azul",
        "Amarelo",
        "Verde",
        "Cinza",
        "Rosa",
        "Laranja",
        "Marrom",
        "Prata",
        "Dourado",
        "Roxo",
        "Bege",
        "Caramelo",
        "Cinza",
        "Lilás",
        "Rosa",
        "Turquesa",
        "Vermelho",
        "Vinho",
    ]
    years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    cities = [
        "Goiânia",
        "Aparecida de Goiânia",
        "Anápolis",
        "Rio Verde",
        "Catalão",
        "Caldas Novas",
        "Cidade de Goiás",
        "Cristalina",
        "Crixás",
        "Cromínia",
        "Cabeceiras",
        "Cachoeira Alta",
        "Cachoeira de Goiás",
        "Cachoeira Dourada",
        "Caiapônia",
        "Caldas Novas",
        "Caldazinha",
        "Campestre de Goiás",
        "Campinaçu",
        "Campinorte",
        "Campo Alegre de Goiás",
        "Campo Limpo de Goiás",
        "Campos Belos",
        "Campos Verdes",
        "Carmo do Rio Verde",
        "Castelândia",
        "Catalão",
        "Caturaí",
        "Cavalcante",
        "Ceres",
        "Cezarina",
        "Chapadão do Céu",
        "Cidade Ocidental",
        "Cocalzinho de Goiás",
        "Colinas do Sul",
        "Córrego do Ouro",
        "Corumbá de Goiás",
        "Corumbaíba",
        "Cristalina",
        "Cristianópolis",
        "Crixás",
        "Cromínia",
        "Cumari",
        "Damianópolis",
        "Damolândia",
        "Davinópolis",
        "Diorama",
        "Divinópolis de Goiás",
        "Doverlândia",
        "Edealina",
        "Edéia",
        "Estrela do Norte",
        "Faina",
        "Fazenda Nova",
        "Firminópolis",
        "Flores de Goiás",
        "Formosa",
        "Formoso",
        "Gameleira de Goiás",
        "Goianápolis",
        "Goiandira",
        "Goianésia",
        "Goiânia",
        "Goianira",
        "Goiás",
        "Goiatuba",
        "Gouvelândia",
        "Guapó",
        "Guaraíta",
        "Guarani de Goiás",
        "Guarinos",
        "Heitoraí",
        "Hidrolândia",
        "Hidrolina",
        "Iaciara",
        "Inaciolândia",
        "Indiara",
        "Inhumas",
    ]

    carro = Carros(
        name=random.choice(names) + " " + random.choice(colors),
        brand=random.choice(brands),
        model=random.choice(names),
        image_url="https://viladoscarros.com.br/wp-content/"
        + "themes/motors/assets/images/plchldr350.png",
        year=random.choice(years),
        location=random.choice(cities),
        mileage=random.randint(0, 100000),
        original_value=random.randint(10000, 100000),
    )
    carro.save()
    logger.info("{} carro criado.".format(carro))
    return carro


def run_seed(self, mode):
    """Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    # Creating 15 addresses
    for i in range(15):
        create_address()
