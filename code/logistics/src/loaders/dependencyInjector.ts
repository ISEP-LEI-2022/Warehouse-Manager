import Container from "typedi";

export default ({
  models,
  controllers,
  services,
  repositories,
}: {
  models: { name: string; model: any }[];
  controllers: { name: string; path: any }[];
  services: { name: string; path: any }[];
  repositories: { name: string; path: any }[];
}) => {
  models.forEach((m) => {
    Container.set(m.name, m.model);
  });

  repositories.forEach((r) => {
    let repositoryClass = require(r.path).default;
    let repositoryInstance = Container.get(repositoryClass);
    Container.set(r.name, repositoryInstance);
  });

  services.forEach((s) => {
    let serviceClass = require(s.path).default;
    let serviceInstance = Container.get(serviceClass);
    Container.set(s.name, serviceInstance);
  });

  controllers.forEach((c) => {
    let controllerClass = require(c.path).default;

    let controllerInstance = Container.get(controllerClass);

    Container.set(c.name, controllerInstance);
  });
};
