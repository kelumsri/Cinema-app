package com.example.cinema_app.service;
//
//import lombok.Value;
//import org.springframework.stereotype.Service;
//import org.yaml.snakeyaml.Yaml;
//
//import java.io.InputStream;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class FilmService {
//
//    @Value("classpath:film.yml")
//    private InputStream inputStream;
//
//    public List<Map<String,String>> getFilm(){
//        Yaml yaml = new Yaml();
//        Map<String, List<Map<String,String>>> data = yaml.load(inputStream);
//        return data.get("films");
//    }
//}

//import com.example.cinema_app.modal.Film;
//import org.springframework.stereotype.Service;
//import org.yaml.snakeyaml.Yaml;
//
//import java.io.InputStream;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//public class FilmService {
//    public List<Film> getAllFilms() {
//        Yaml yaml = new Yaml();
//        InputStream inputStream = this.getClass()
//                .getClassLoader()
//                .getResourceAsStream("films.yml");
//
//        Map<String, List<Map<String, String>>> data = yaml.load(inputStream);
//        List<Map<String, String>> filmsData = data.get("films");
//
//        return filmsData.stream()
//                .map(filmData -> {
//                    Film film = new Film();
//                    film.setName(filmData.get("name"));
//                    film.setType(filmData.get("type"));
//                    film.setImage(filmData.get("image"));
//                    return film;
//                })
//                .collect(Collectors.toList());
//    }
//}

import com.example.cinema_app.modal.Film;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.List;

@Service
public class FilmService {
    public List<Film> getAllFilms() {
        Yaml yaml = new Yaml();
        InputStream inputStream = this.getClass()
                .getClassLoader()
                .getResourceAsStream("films.yml");

        List<Film> films = yaml.loadAs(inputStream, List.class);
        return films;
    }
}
