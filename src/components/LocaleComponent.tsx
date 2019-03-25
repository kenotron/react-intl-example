import React from 'react';
import qs from 'querystring';
import intl from 'react-intl-universal';

const getLocale = (locale: string) => import(`../locale/${locale}/strings.json`);

export interface LocaleComponentState {
  isLoading: boolean;
}

export interface LocaleComponentProps {
  defaultLocale?: string;
  defaultLocaleData?: { [key: string]: string };
}

export class LocaleComponent extends React.Component<LocaleComponentProps, LocaleComponentState> {
  constructor(props: LocaleComponentProps) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async loadLocales() {
    const { defaultLocale, defaultLocaleData } = this.props;
    const langQueryString = qs.parse(window.location.search.slice(1)).lang as string;
    const currentLocale = langQueryString || defaultLocale || 'en';

    let localeData: { [locale: string]: { [key: string]: string } };

    if (!defaultLocale || !defaultLocaleData || defaultLocale !== currentLocale) {
      localeData = { [currentLocale]: await getLocale(currentLocale) };
    } else {
      localeData = { [defaultLocale]: defaultLocaleData };
    }

    await intl.init({
      currentLocale,
      locales: localeData
    });
    this.setState({
      isLoading: false
    });
  }

  componentDidMount() {
    this.loadLocales();
  }

  render() {
    return !this.state.isLoading ? <>{this.props.children}</> : null;
  }
}
