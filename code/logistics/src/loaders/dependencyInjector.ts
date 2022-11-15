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
    const repositoryClass = require(r.path).default;
    const repositoryInstance = Container.get(repositoryClass);
    Container.set(r.name, repositoryInstance);
  });

  services.forEach((s) => {
    const serviceClass = require(s.path).default;
    const serviceInstance = Container.get(serviceClass);
    Container.set(s.name, serviceInstance);
  });

  controllers.forEach((c) => {
    const controllerClass = require(c.path).default;

    const controllerInstance = Container.get(controllerClass);

    Container.set(c.name, controllerInstance);
  });
};
