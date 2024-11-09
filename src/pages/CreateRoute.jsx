import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import TextField from "@mui/material/TextField";
import { ReactSortable } from "react-sortablejs";
import DeleteIcon from "@mui/icons-material/Delete";
import ListSubheader from "@mui/material/ListSubheader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Map from "../components/Map";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";

function App() {
  const items = [
    {
      title: "Места культуры",
      places: [
        {
          title: "Русский драматический театр",
          description:
            "Здание русского драматического театра (бывшее здание Дворца культуры «Машиностроитель») яркий пример развития советской архитектуры конструктивизма к архитектуре 50-х годов.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16378_1.jpg",
          coordinates: [56.84127582532452, 53.205406197923615],
        },
        {
          title: "Государственный национальный театр Удмуртской Республики",
          description:
            "Предшественником Государственного национального театра был Центральный удмуртский клуб «Красный удмурт», возникший в 1923 году. При нём действовал драматический кружок, давший начало самодеятельному театру, на базе которого 7 февраля 1931 года был создан первый профессиональный удмуртский театр.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16379_1.jpg",
          coordinates: [56.87176889746844, 53.24509912866931],
        },
        {
          title: "Государственный цирк Удмуртской Республики",
          description:
            "Первый в Ижевске цирк открылся в 1895 году на Базарной площади возле мучного базара (пересечение улиц Горького и Бородина на месте старого корпуса механического института). Постоянно действующее деревянное здание было построено на средства предпринимателя А. Г. Коромыслова. В цирке гастролировали артисты из Вены, Парижа, Берлина, проводились чемпионаты борцов. Цирк сгорел во время Гражданской войны.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16377_1.jpg",
          coordinates: [56.84133, 53.210987],
        },
        {
          title: "Государственный театр кукол Удмуртской Республики",
          description:
            "Современное здание государственного театра кукол построено в 1980 году, однако история театра кукол в Ижевске началась намного раньше - в 1935 году. Его организаторами стали С. Ломовская и М. Точилина (Стрелкова), окончившие специальные курсы кукловодов при Центральном театре кукол под руководством С.Образцова.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16374_1.jpg",
          coordinates: [56.848675, 53.222782],
        },
        {
          title: "Летний сад им. М. Горького Генеральский сад",
          description:
            "Летний сад (первое название Генеральский сад) – старейший парк города Ижевска. Это самый благоустроенный и самый посещаемый парк, расположенный в центре города и надежно связанный всеми видами транспорта с любым районом Ижевска.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16401_1.jpg",
          coordinates: [56.848625, 53.199222],
        },
        {
          title: "Парк культуры и отдыха имени С.М. Кирова",
          description:
            "Парк культуры и отдыха имени С. М. Кирова - памятник истории и садово-паркового искусства города Ижевска. Заложенный согласно регулярному плану он был построен по проекту, разработанному архитекторами А.С. Коробовым и Е.П. Беневоленским.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16266_1.jpg",
          coordinates: [56.865342, 53.172678],
        },
        {
          title:
            "БУК УР ИДО Музейно-выставочный комплекс оружия им. М.Т. Калашникова",
          description:
            "Музейно-выставочный комплекс стрелкового оружия имени М. Т. Калашникова появился на культурной карте России в 2004 году. Он сразу же стал достопримечательностью столицы Удмуртской Республики — города Ижевска, оружейная история которого насчитывает более двухсот лет.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16386_1.jpg",
          coordinates: [56.850675, 53.206466],
        },
        {
          title: "БУК УР Государственный зоологический парк Удмуртии",
          description:
            "Строительство Государственного зоологического парка Удмуртии началось в 2006 году, разработчиками нового места для отдыха ижевчан и гостей города стали специалисты ЗАО «Удмуртгражданпроект». Строительством руководил А.П. Курбатов - УССТ № 6 при Спецстрое России",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16367_1.jpg",
          coordinates: [56.866463, 53.171675],
        },
      ],
    },
    {
      title: "Памятники и скульптуры",
      places: [
        {
          title:
            "Памятник первому председателю Удмуртской автономии И. А. Наговицыну",
          description:
            "Памятник первому председателю Удмуртской автономии И. А. Наговицыну. Бронза. 1988.Скульптор Борис Михайлович Козлов. С 1919 руководитель Вотского отдела Наркомата по делам национальностей РСФСР. С 1921 пред. ревкома и облисполкома Удмуртии. С 1925 член коллегии Наркомата просвещения РСФСР, пред. Совета по просвещению национальных меньшинств.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_26864_1.jpg",
          coordinates: [56.846145, 53.216417],
        },
        {
          title: "Памятник ижевским оружейникам",
          description:
            "Одну из знаковых достопримечательностей город обрел относительно недавно. В 2007 г. перед проходной «Ижмаша» появилась скульптурная композиция, изображающая знаменитых кафтанщиков – непревзойденных оружейников, прославивших Ижевск на всю Россию",
          imgSrc:
            "https://tur-ray.ru/wp-content/uploads/2017/12/pamyatnik-izhevskim-oruzheynikam.jpg",
          coordinates: [56.843957, 53.197617],
        },
        {
          title: "Петр и Феврония у ладьи",
          description:
            "Петр и Феврония Муромские считаются в России главным символом любви и верности, нерушимости брачных уз.",
          imgSrc:
            "https://tur-ray.ru/wp-content/uploads/2017/12/petr-i-fevroniya-u-ladi.jpg",
          coordinates: [56.849731, 53.20598],
        },
        {
          title: "Ижик",
          description:
            "Главным талисманом города считается колоритная скульптура Ижика, установленная на Центральной площади в дни празднования 250-летия Ижевска.",
          imgSrc: "https://tur-ray.ru/wp-content/uploads/2017/12/izhik.jpg",
          coordinates: [56.852525, 53.203769],
        },
        {
          title: "Памятник Слава науке",
          description:
            "Почти полвека стоит памятник Слава науку второго корпуса Ижевского Государственного технического университета в центре студенческого городка. За это время монумент обрел свое второе имя - Вечный студент, симпатию ижевчан и стал городским памятником, без которого многие поколения механиков просто не представляют родного вуз.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16249_1.jpg",
          coordinates: [56.872812, 53.175312],
        },
        {
          title: "Скульптура «Кот ученый»",
          description:
            "27 мая 2015 года в Ижевске была установлена новая скульптура «Кот ученый». Кованая скульптура кота стоит рядом с дубом, высота скульптуры более метра. Кот стоит на постаменте и опирается на трость, на нем очки, а подмышкой находится энциклопедия пушкинских сказок.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_26735_1.jpg",
          coordinates: [56.860755, 53.214714],
        },
        {
          title: "Ироническая скульптура Ижевский крокодил",
          description:
            "Ироническая скульптура «Ижевский крокодил» появилась на пересечении улиц Советской и Коммунаров в 2005 году в рамках программы Приволжского федерального округа «Культурных столиц Поволжья-2005».",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16358_1.jpg",
          coordinates: [56.846733, 53.220296],
        },
      ],
    },
    {
      title: "Здания и сооружения",
      places: [
        {
          title: "Главный корпус Ижевского оружейного завода",
          description:
            "Главный корпус Ижевского оружейного завода, выполненный в стиле высокого классицизма, уникальное произведение промышленной архитектуры России начала XIX века играющий ведущую градостроительную роль в Ижевске.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16407_1.jpg",
          coordinates: [56.844155, 53.19132],
        },
        {
          title: "Арсенал. Ижевский Кремль.",
          description:
            "Арсенал ижевского оружейного завода — архитектурный памятник эпохи русского классицизма XIX века. Начало строительства Арсенала было положено архитектором С.Е.Дудиным в 1823 году, а окончательная отделка закончена в 1827 году.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16406_1.jpg",
          coordinates: [56.854778, 53.2154],
        },
        {
          title: "Здание Железнодорожного вокзала",
          description:
            "Железнодорожный вокзал станции Ижевск это современный комплекс зданий и сооружений для обслуживания пассажиров дальнего и пригородного сообщения.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16361_1.jpg",
          coordinates: [56.803289, 53.189386],
        },
        {
          title: "Пиво-медовареные корпуса завода Бодалева",
          description:
            "Пиво-медовареные корпуса завода Бодалева представляют собой единственный в Ижевске образец промышленного сооружения данного типа, выполненный в стиле модерн.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16363_1.jpg",
          coordinates: [56.808035, 53.279676],
        },
      ],
    },
    {
      title: "Соборы и храмы",
      places: [
        {
          title: "ХРАМ ИВЕРСКОЙ ИКОНЫ БОЖИЕЙ МАТЕРИ",
          description:
            "В 2008 году по благословению Митрополита Ижевского и Удмуртского Николая (Шкрумко) началось проектирование, а в 2009 году была произведена закладка камня и начато строительство храма в честь Иверской иконы Божией Матери.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_26380_1.jpg",
          coordinates: [56.821019, 53.254298],
        },
        {
          title: "ХРАМ СЕРАФИМА САРОВСКОГО",
          description:
            "Храм Серафима Саровского в Ижевске был построен на пожертвования местного населения в 2013 году.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_26382_1.jpg",
          coordinates: [56.852502, 53.275644],
        },
        {
          title: "Собор Александра Невского",
          description:
            "Александро-Невский собор – памятник истории и архитектуры русского высокого классицизма. За образец нового Собора был взят Андреевский собор в Кронштадте, построенный в 1817 году по проекту А.Д. Захарова и уничтоженный после революции.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16400_1.jpg",
          coordinates: [56.844005, 53.201899],
        },
        {
          title: "ХРАМ ИКОНЫ БОЖИЕЙ МАТЕРИ «ДЕРЖАВНАЯ»",
          description:
            "По благословению Высокопреосвященнейшего Николая, Митрополита Ижевского и Удмуртского, рядом с храмом Новомученников и Исповедников Российских в 2009 году заложен двухпрестольный храм.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_26385_1.jpg",
          coordinates: [56.873312, 53.114855],
        },
      ],
    },
  ];
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [logo, setLogo] = useState();
  const [list, setList] = useState([]);
  console.log(list)
  const handleSubmitPlace = (place) => {
    setList([...list, place]);
  };
  const removePlace = (index) => {
    const reducedArr = [...list];
    reducedArr.splice(index, 1);
    setList(reducedArr);
  };
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  const onSubmit = async () => {
    try {
      const fields = {
        title,
        description,
        list,
        logo,
      };
      await axios.post("/", fields);
      navigate(`/`);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создании опроса");
    }
  };
  return (
    <Paper sx={{ m: 10, p: 5 }}>
      <Stack spacing={5}>
        <TextField
          id="filled-basic"
          label="Название"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          id="filled-basic"
          label="Описание"
          variant="filled"
          sx={{
            mt: 4,
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Лого (ссылка на изображение)"
          variant="filled"
          sx={{
            mt: 4,
          }}
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />

        {logo && <img src={logo} alt="logo" width={200} height={200} />}
        {list.length ? (
          <Carousel navButtonsAlwaysVisible autoPlay={false} swipe={true}>
            {list.map((item, i) => (
              <Paper sx={{ height: 400 }} elevation={3} key={i} item={item}>
                <Box display={"flex"} alignItems={"center"} p={10}>
                  <img width={200} height={200} src={item.imgSrc} alt="" />
                  <Box p={10}>
                    <Typography variant="h3">{item.title}</Typography>
                    <Typography variant="h5">{item.description}</Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Carousel>
        ) : null}

        <FormControl variant="filled" className="w-full sm:w-1/4">
          <InputLabel htmlFor="grouped-select">Выберите место</InputLabel>
          <Select defaultValue="" id="grouped-select" label="Grouping">
            {items.map((item) => [
              <ListSubheader key={item.title}>{item.title}</ListSubheader>,
              ...item.places.map((place) => (
                <MenuItem
                  key={place.title}
                  value={place.title}
                  onClick={() => {
                    handleSubmitPlace(place);
                  }}
                >
                  {place.title}
                </MenuItem>
              )),
            ])}
          </Select>
        </FormControl>
        <ReactSortable
          group="groupName"
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          list={list}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
          setList={setList}
          onChange={(event) => handleChange(event.target.value)}
        >
          {list.map((item, index) => (
            <Paper
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                justifyContent: "space-between",
              }}
            >
              <Typography>{item.title}</Typography>

              <IconButton
                onClick={() => {
                  removePlace(index);
                }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </ReactSortable>

        <Map places={list} />

        <Button variant="contained" onClick={onSubmit}>
          Опубликовать
        </Button>
      </Stack>
    </Paper>
  );
}

export default App;
