import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Input } from
    '@angular/core';

@Component({
    selector: 'dynamic-section',
    template: '<ng-container #dynamicSectionContainer></ng-container>'
})
export class DynamicSectionComponent {

    currentComponent: any;

    @ViewChild('dynamicSectionContainer', { read: ViewContainerRef })
    dynamicSectionContainer: ViewContainerRef;

    constructor(private readonly resolver: ComponentFactoryResolver) {}

    @Input()
    set sectionData(data: { component?: any, inputs?: Object, outputs?: Object, providers?: Object }) {
        if (!data) {
            return;
        }

        data.inputs = data.inputs || {};
        data.outputs = data.outputs || {};
        data.providers = data.providers || {};

        const providers = Object.keys(data.providers).map((providerName) => {
            return { provide: providerName, useValue: data.providers[providerName] };
        });
        const resolvedProviders = ReflectiveInjector.resolve(providers);

        // We create an injector out of the data we want to pass down and this components injector
        const injector = ReflectiveInjector
            .fromResolvedProviders(resolvedProviders, this.dynamicSectionContainer.parentInjector);

        // We create a factory out of the component we want to create
        const factory = this.resolver.resolveComponentFactory(data.component);

        // We create the component using the factory and the injector
        const component = factory.create(injector);

        Object.keys(data.inputs).forEach(input => {
            component.instance[input] = data.inputs[input];
        });

        Object.keys(data.outputs)
            .filter(output => !!component.instance[output])
            .forEach(output => component.instance[output].subscribe(data.outputs[output]));

        // We insert the component into the dom container
        this.dynamicSectionContainer.insert(component.hostView);

        // Destroy the previously created component
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = component;
    }
}
